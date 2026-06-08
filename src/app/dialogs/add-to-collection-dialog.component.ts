import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { IMovie } from '../models/api-models';
import { CollectionsService } from '../core/collections.service';
import { OmdbService } from '../core/omdb.service';
import { WatchedStore } from '../core/watched-store';

export interface AddToCollectionData {
  /** IMDB id to fetch full details for (search flow). */
  imdbId?: string;
  /** A fully-resolved movie (move/copy flow). */
  movie?: IMovie;
  title?: string;
}

@Component({
  selector: 'app-add-to-collection-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title ?? 'Add to collection' }}</h2>
    <mat-dialog-content>
      @if (collections().length) {
        <mat-form-field appearance="outline" class="full">
          <mat-label>Collection</mat-label>
          <mat-select [formControl]="collectionId">
            @for (col of collections(); track col.id) {
              <mat-option [value]="col.id">{{ col.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      } @else {
        <p class="empty">You don't have any collections yet. Create one first.</p>
      }

      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button
        mat-flat-button
        color="primary"
        [disabled]="collectionId.invalid || saving()"
        (click)="add()"
      >
        {{ saving() ? 'Adding…' : 'Add' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .full { width: 320px; max-width: 100%; }
      .empty { color: var(--app-text-dim); max-width: 320px; margin: 0; }
      .error { color: #ff8b9a; margin: 8px 0 0; font-size: 0.88rem; }
    `,
  ],
})
export class AddToCollectionDialogComponent {
  private readonly collectionsSvc = inject(CollectionsService);
  private readonly omdb = inject(OmdbService);
  private readonly store = inject(WatchedStore);
  private readonly dialogRef = inject(MatDialogRef<AddToCollectionDialogComponent>);

  readonly collections = this.store.collections;
  readonly collectionId = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly data = inject<AddToCollectionData>(MAT_DIALOG_DATA);

  async add(): Promise<void> {
    if (this.collectionId.invalid) {
      return;
    }
    this.saving.set(true);
    this.error.set(null);
    try {
      const movie = this.data.movie ?? (await this.omdb.getMovie(this.data.imdbId!));
      if (!movie) {
        throw new Error('Could not load details for this title.');
      }
      await this.collectionsSvc.upsertMovie(movie, this.collectionId.value);
      this.dialogRef.close(true);
    } catch (e) {
      this.saving.set(false);
      this.error.set(e instanceof Error ? e.message : 'Something went wrong.');
    }
  }
}
