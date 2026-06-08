import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { ICollection, IMovie } from '../models/api-models';
import { AuthService } from './auth.service';
import { WatchedStore } from './watched-store';

interface IFirebaseCollection {
  owner: string;
  ownerEmail: string;
  ownerName: string;
  name: string;
  id: string;
  movies: IMovie[];
}

interface IPostResult {
  status: string;
  message: string;
  data: unknown;
}

/**
 * REST adapter for the Firebase Cloud Function that persists collections.
 * Mirrors the store optimistically once the backend confirms a change.
 */
@Injectable({ providedIn: 'root' })
export class CollectionsService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly store = inject(WatchedStore);

  private readonly url = environment.collectionsApiUrl;

  private async authHeaders(): Promise<Record<string, string>> {
    const token = await this.auth.getToken();
    return {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    };
  }

  /** Load all collections for the signed-in user into the store. */
  async loadAll(): Promise<void> {
    try {
      const headers = await this.authHeaders();
      const data = await firstValueFrom(
        this.http.get<IFirebaseCollection[]>(this.url, { headers }),
      );
      const collections: ICollection[] = (data ?? []).map((col) => ({
        id: col.id,
        name: col.name,
        movies: col.movies ?? [],
      }));
      this.store.setAll(collections);
    } catch (error) {
      console.warn('Failed to load collections: ', error);
    }
  }

  /** Create or replace a collection. */
  async upsert(collection: ICollection): Promise<void> {
    const headers = await this.authHeaders();
    const result = await firstValueFrom(
      this.http.post<IPostResult>(this.url, collection, { headers }),
    );
    if (result.status === 'success') {
      this.store.upsert(collection);
    } else {
      throw new Error(result.message);
    }
  }

  async deleteCollection(collectionId: string): Promise<void> {
    const headers = await this.authHeaders();
    const result = await firstValueFrom(
      this.http.post<IPostResult>(`${this.url}/delete`, { collectionId }, { headers }),
    );
    if (result.status === 'success') {
      this.store.remove(collectionId);
    } else {
      throw new Error(result.message);
    }
  }

  /** Add a movie to a collection, or replace it if already present. */
  async upsertMovie(movie: IMovie, collectionId: string): Promise<void> {
    const collection = this.cloneCollection(collectionId);
    if (!collection) {
      return;
    }
    const index = collection.movies.findIndex((m) => m.Id === movie.Id);
    if (index === -1) {
      collection.movies.push(movie);
    } else {
      collection.movies[index] = movie;
    }
    await this.upsert(collection);
  }

  async removeMovie(collectionId: string, movieId: string): Promise<void> {
    const collection = this.cloneCollection(collectionId);
    if (!collection) {
      return;
    }
    collection.movies = collection.movies.filter((m) => m.Id !== movieId);
    await this.upsert(collection);
  }

  private cloneCollection(id: string): ICollection | undefined {
    const found = this.store.getById(id);
    return found ? structuredClone(found) : undefined;
  }
}
