import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { WatchedStore } from '../../core/watched-store';
import { CreateCollectionDialogComponent } from '../../dialogs/create-collection-dialog.component';
import { ImportCollectionDialogComponent } from '../../dialogs/import-collection-dialog.component';

interface CollectionTitleHit {
  collectionId: string;
  collectionName: string;
  movieTitle: string;
  poster: string;
}

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent {
  private readonly store = inject(WatchedStore);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly collections = this.store.collections;
  readonly isEmpty = this.store.isEmpty;
  readonly loading = this.store.loading;
  readonly query = signal('');

  /** Movies across all collections whose title matches the filter. */
  readonly matches = computed<CollectionTitleHit[]>(() => {
    const term = this.query().trim().toLowerCase();
    if (!term) {
      return [];
    }
    const hits: CollectionTitleHit[] = [];
    for (const col of this.collections()) {
      for (const movie of col.movies) {
        if (movie.Title.toLowerCase().includes(term)) {
          hits.push({
            collectionId: col.id,
            collectionName: col.name,
            movieTitle: movie.Title,
            poster: movie.PosterUrl,
          });
        }
      }
    }
    return hits;
  });

  onSearch(value: string): void {
    this.query.set(value);
  }

  open(id: string): void {
    this.router.navigate(['/collection', id]);
  }

  create(): void {
    this.dialog.open(CreateCollectionDialogComponent);
  }

  import(): void {
    this.dialog.open(ImportCollectionDialogComponent);
  }

  posterFor(id: string): string | null {
    const movies = this.store.getById(id)?.movies ?? [];
    const withPoster = movies.find((m) => m.PosterUrl && m.PosterUrl !== 'N/A');
    return withPoster?.PosterUrl ?? null;
  }

  countFor(id: string): number {
    return this.store.getById(id)?.movies.length ?? 0;
  }
}
