import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { firstValueFrom } from 'rxjs';
import { ICollection, IMovie } from '../../models/api-models';
import { CollectionsService } from '../../core/collections.service';
import { ExportImportService } from '../../core/export-import.service';
import { WatchedStore } from '../../core/watched-store';
import {
  AddToCollectionData,
  AddToCollectionDialogComponent,
} from '../../dialogs/add-to-collection-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-collection-detail',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './collection-detail.component.html',
  styleUrl: './collection-detail.component.scss',
})
export class CollectionDetailComponent {
  /** Route param bound via withComponentInputBinding. */
  readonly id = input.required<string>();

  private readonly store = inject(WatchedStore);
  private readonly collectionsSvc = inject(CollectionsService);
  private readonly exportImport = inject(ExportImportService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly collection = computed<ICollection | undefined>(() =>
    this.store.collections().find((c) => c.id === this.id()),
  );
  readonly editingName = signal(false);
  private readonly nameInput = viewChild<ElementRef<HTMLInputElement>>('nameInput');

  constructor() {
    // Focus the rename field as soon as it appears.
    effect(() => {
      if (this.editingName()) {
        const el = this.nameInput()?.nativeElement;
        if (el) {
          el.focus();
          el.select();
        }
      }
    });
  }

  startRename(): void {
    this.editingName.set(true);
  }

  async commitRename(value: string): Promise<void> {
    this.editingName.set(false);
    const col = this.collection();
    const name = value.trim();
    if (!col || !name || name === col.name) {
      return;
    }
    await this.collectionsSvc.upsert({ ...col, name });
  }

  export(): void {
    const col = this.collection();
    if (col) {
      this.exportImport.exportCollection(col);
    }
  }

  async deleteCollection(): Promise<void> {
    const col = this.collection();
    if (!col) {
      return;
    }
    const data: ConfirmDialogData = {
      title: 'Delete collection',
      message: `Delete "${col.name}"? This cannot be undone.`,
      confirmLabel: 'Delete',
      destructive: true,
    };
    const confirmed = await firstValueFrom(
      this.dialog.open(ConfirmDialogComponent, { data }).afterClosed(),
    );
    if (confirmed) {
      await this.collectionsSvc.deleteCollection(col.id);
      this.router.navigate(['/collections']);
    }
  }

  async removeMovie(movie: IMovie, skipConfirm = false): Promise<void> {
    const col = this.collection();
    if (!col) {
      return;
    }
    if (!skipConfirm) {
      const data: ConfirmDialogData = {
        title: 'Remove title',
        message: `Remove "${movie.Title}" from ${col.name}?`,
        confirmLabel: 'Remove',
        destructive: true,
      };
      const confirmed = await firstValueFrom(
        this.dialog.open(ConfirmDialogComponent, { data }).afterClosed(),
      );
      if (!confirmed) {
        return;
      }
    }
    await this.collectionsSvc.removeMovie(col.id, movie.Id);
  }

  async moveMovie(movie: IMovie): Promise<void> {
    const data: AddToCollectionData = { movie, title: 'Move to collection' };
    const moved = await firstValueFrom(
      this.dialog.open(AddToCollectionDialogComponent, { data }).afterClosed(),
    );
    if (moved) {
      await this.removeMovie(movie, true);
    }
  }

  copyMovie(movie: IMovie): void {
    const data: AddToCollectionData = { movie, title: 'Copy to collection' };
    this.dialog.open(AddToCollectionDialogComponent, { data });
  }

  ratingPercent(value?: number): number | null {
    return value === undefined || Number.isNaN(value) ? null : Math.round(value);
  }
}
