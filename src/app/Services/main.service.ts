import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiAdapterService } from '../Adapters/api-adapter.service';
import { LocalStorageAdapterService } from '../Adapters/local-storage-adapter.service';
import { IColection, IMovie, ISearchResult } from '../Models/ApiModels';
import { WatchedStore } from '../State/WatchedStore';

@Injectable({
	providedIn: 'root',
})
export class MainService
{
	private currentSearch: BehaviorSubject<ISearchResult> = new BehaviorSubject<ISearchResult>({ Search: [], Response: "", totalResults: "" });
	public currentSearchResult$: Observable<ISearchResult>;

	constructor(
		private api: ApiAdapterService,
		private store: WatchedStore,
		private storage: LocalStorageAdapterService,
	)
	{
		this.currentSearchResult$ = this.currentSearch.asObservable();
	}

	public loadAll(): void
	{
		if (!this.getDb())
		{
			this.storage.setLocalStorageObject({});
			this.upsert({
				id: 'test123',
				name: 'testColection',
				movies: [],
			});
		}

		const db = this.getDb();
		Object.keys(db).forEach(key =>
		{
			this.store.upsert(db[key].id, db[key]);
		});
	}

	public upsert(colection: IColection): void
	{
		const db = this.getDb();
		db[colection.id] = colection;
		this.setDb(db);
	}

	public update(colection: Partial<IColection>): void
	{
		const db = this.getDb();

		if (colection.name) { db[colection.id].name = colection.name; }
		if (colection.movies) { db[colection.id].movies = colection.movies; }
		this.setDb(db);
	}

	public delete(colectionId: string): void
	{
		this.store.remove(colectionId);
		const allDb = this.getDb();
		delete allDb[colectionId];
		this.setDb(allDb);
	}

	public upsertMovie(movie: IMovie, colectionId: string): void
	{
		const db = this.getDb();
		const colection: IColection = db[colectionId];
		if (colection && !colection.movies.find(x => x.Id === movie.Id))
		{
			colection.movies.push(movie);
		}
		db[colectionId] = colection;
		this.setDb(db);
	}

	public Search(term: string): void
	{
		this.api.Search(term).subscribe(result => this.currentSearch.next(result));
	}

	private getDb(): {}
	{
		return this.storage.getLocalStorageObject();
	}

	private setDb(db: {}): void
	{
		this.storage.setLocalStorageObject(db);
		this.loadAll();
	}
}
