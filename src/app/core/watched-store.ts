import { Injectable, computed, signal } from '@angular/core';
import { ICollection } from '../models/api-models';

/**
 * Reactive store for the user's collections, built on Angular signals.
 * Replaces the old Akita EntityStore/Query pair.
 */
@Injectable({ providedIn: 'root' })
export class WatchedStore {
  private readonly _collections = signal<ICollection[]>([]);
  private readonly _loading = signal(true);

  /** All collections, sorted alphabetically. */
  readonly collections = computed(() =>
    [...this._collections()].sort((a, b) => a.name.localeCompare(b.name)),
  );

  readonly isEmpty = computed(() => this._collections().length === 0);

  /** True while collections are being (re)loaded from the backend. */
  readonly loading = this._loading.asReadonly();

  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  setAll(collections: ICollection[]): void {
    this._collections.set(collections);
  }

  upsert(collection: ICollection): void {
    this._collections.update((list) => {
      const index = list.findIndex((c) => c.id === collection.id);
      if (index === -1) {
        return [...list, collection];
      }
      const copy = [...list];
      copy[index] = collection;
      return copy;
    });
  }

  remove(id: string): void {
    this._collections.update((list) => list.filter((c) => c.id !== id));
  }

  getById(id: string): ICollection | undefined {
    return this._collections().find((c) => c.id === id);
  }

  reset(): void {
    this._collections.set([]);
    this._loading.set(true);
  }
}
