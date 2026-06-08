import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';
import { ICollection } from '../models/api-models';
import { CollectionsService } from '../core/collections.service';
import { ExportImportService } from '../core/export-import.service';
import { WatchedStore } from '../core/watched-store';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-import-collection-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Import collection</h2>
    <mat-dialog-content>
      <p class="hint">Select a <code>.json</code> file previously exported from Watched.</p>

      <label class="dropzone">
        <input type="file" accept="application/json,.json" hidden (change)="onFile($event)" />
        <span class="material-symbols-rounded">upload_file</span>
        <span>{{ fileName() ?? 'Choose a file' }}</span>
      </label>

      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-flat-button color="primary" [disabled]="!parsed() || saving()" (click)="import()">
        {{ saving() ? 'Importing…' : 'Import' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .hint { margin: 0 0 16px; color: var(--app-text-dim); max-width: 360px; }
      code { background: var(--app-surface); padding: 1px 6px; border-radius: 6px; }
      .dropzone {
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 8px; padding: 28px; width: 360px; max-width: 100%;
        border: 1.5px dashed var(--app-border); border-radius: 14px;
        color: var(--app-text-dim); cursor: pointer; transition: border-color .18s, color .18s;
      }
      .dropzone:hover { border-color: var(--app-accent); color: var(--app-text); }
      .dropzone .material-symbols-rounded { font-size: 32px; }
      .error { color: #ff8b9a; margin: 12px 0 0; font-size: .88rem; }
    `,
  ],
})
export class ImportCollectionDialogComponent {
  private readonly collections = inject(CollectionsService);
  private readonly exportImport = inject(ExportImportService);
  private readonly store = inject(WatchedStore);
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject(MatDialogRef<ImportCollectionDialogComponent>);

  readonly fileName = signal<string | null>(null);
  readonly error = signal<string | null>(null);
  readonly saving = signal(false);
  readonly parsed = signal<ICollection | null>(null);

  async onFile(event: Event): Promise<void> {
    this.error.set(null);
    this.parsed.set(null);
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    this.fileName.set(file.name);
    try {
      const text = await file.text();
      this.parsed.set(this.exportImport.parseCollection(text));
    } catch {
      this.error.set('That file is not a valid Watched collection.');
    }
  }

  async import(): Promise<void> {
    const collection = this.parsed();
    if (!collection) {
      return;
    }

    if (this.store.getById(collection.id)) {
      const confirmed = await firstValueFrom(
        this.dialog
          .open(ConfirmDialogComponent, {
            data: {
              title: 'Overwrite collection?',
              message:
                'A collection with this ID already exists. Importing will overwrite it.',
              confirmLabel: 'Import anyway',
              destructive: true,
            },
          })
          .afterClosed(),
      );
      if (!confirmed) {
        return;
      }
    }

    this.saving.set(true);
    try {
      await this.collections.upsert(collection);
      this.dialogRef.close(true);
    } catch {
      this.saving.set(false);
      this.error.set('Import failed. Please try again.');
    }
  }
}
