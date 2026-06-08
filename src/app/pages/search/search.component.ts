import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ISearchResultItem } from '../../models/api-models';
import { OmdbService } from '../../core/omdb.service';
import {
  AddToCollectionData,
  AddToCollectionDialogComponent,
} from '../../dialogs/add-to-collection-dialog.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private readonly omdb = inject(OmdbService);
  private readonly dialog = inject(MatDialog);

  readonly term = signal('');
  readonly results = signal<ISearchResultItem[]>([]);
  readonly loading = signal(false);
  readonly searched = signal(false);

  async search(value: string): Promise<void> {
    const term = value.trim();
    this.term.set(term);
    if (!term) {
      return;
    }
    this.loading.set(true);
    this.searched.set(true);
    try {
      const results = await this.omdb.search(term);
      // De-duplicate by IMDB id (OMDB occasionally repeats across pages).
      const seen = new Set<string>();
      this.results.set(results.filter((r) => !seen.has(r.imdbID) && seen.add(r.imdbID)));
    } catch {
      this.results.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  addToCollection(item: ISearchResultItem): void {
    const data: AddToCollectionData = { imdbId: item.imdbID, title: `Add "${item.Title}"` };
    this.dialog.open(AddToCollectionDialogComponent, { data });
  }
}
