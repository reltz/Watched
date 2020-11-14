import { Injectable } from '@angular/core';
import { IColection, IMovie } from '../Models/ApiModels';
import { WatchedStore } from '../State/WatchedStore';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageAdapterService
{
	private readonly localDBName: string = 'WatchedLS';

	constructor(
		private store: WatchedStore,
	)
	{

	}

	public init()
	{
		if (!this.getLocalStorageObject())
		{
			this.setLocalStorageObject({});
		}
	}

	public loadAll()
	{
		const db = this.getLocalStorageObject();
		// this.store.remove();
		Object.keys(db).forEach(key =>
		{
			this.store.upsert(db[key].id, db[key]);
		});
	}

	/* Colections */
	public upsert(colection: IColection)
	{
		const db = this.getLocalStorageObject();
		db[colection.id] = colection;
		this.setLocalStorageObject(db);
	}

	public updateCol(colection: Partial<IColection>)
	{
		const db = this.getLocalStorageObject();

		if (colection.name) { db[colection.id].name = colection.name; }
		if (colection.movies) { db[colection.id].movies = colection.movies; }
		this.setLocalStorageObject(db);
	}

	public deleteCol(colectionId: string)
	{
		const db = this.getLocalStorageObject();
		this.store.remove(colectionId);
		delete db[colectionId];
		this.setLocalStorageObject(db);
	}

	public upsertOrUpdateMovie(movie: IMovie, colectionId: string)
	{
		const db = this.getLocalStorageObject();
		const colection: IColection = db[colectionId];

		if (colection)
		{
			const indexFound = colection.movies.findIndex(x => x.Id === movie.Id);
			if (indexFound)
			{
				colection.movies.splice(indexFound, 0);
			}
			colection.movies.push(movie);
			this.setLocalStorageObject(db);
		}
	}

	public removeMovie(colId: string, movieId: string)
	{
		const db = this.getLocalStorageObject();
		const col: IColection = db[colId];
		const index = col.movies.findIndex(mov => mov.Id === movieId);
		if (index)
		{
			col.movies.splice(index, 1);
			this.setLocalStorageObject(db);
		} else
		{
			throw Error;
		}
	}

	public restoreData(data: string): void
	{
		localStorage.setItem(this.localDBName, data);
		this.loadAll();
	}

	/* Private helpers */

	private getLocalStorageObject()
	{
		return JSON.parse(localStorage.getItem(this.localDBName));
	}

	private setLocalStorageObject(db: {}): void
	{
		localStorage.setItem(this.localDBName, JSON.stringify(db));
		this.loadAll();
	}
}
