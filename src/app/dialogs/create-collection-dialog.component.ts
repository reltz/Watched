import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { v4 as uuid } from 'uuid';
import { CollectionsService } from '../core/collections.service';

@Component({
  selector: 'app-create-collection-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>New collection</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full">
        <mat-label>Collection name</mat-label>
        <input matInput [formControl]="name" placeholder="e.g. Weekend Watchlist" (keydown.enter)="create()" />
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-flat-button color="primary" [disabled]="name.invalid || saving()" (click)="create()">
        {{ saving() ? 'Creating…' : 'Create' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`.full { width: 320px; max-width: 100%; }`],
})
export class CreateCollectionDialogComponent {
  private readonly collections = inject(CollectionsService);
  private readonly dialogRef = inject(MatDialogRef<CreateCollectionDialogComponent>);

  readonly name = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  readonly saving = signal(false);

  async create(): Promise<void> {
    if (this.name.invalid) {
      return;
    }
    this.saving.set(true);
    try {
      await this.collections.upsert({ id: uuid(), name: this.name.value.trim(), movies: [] });
      this.dialogRef.close(true);
    } catch {
      this.saving.set(false);
    }
  }
}
