import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiAdapterService } from '../Adapters/api-adapter.service';
import { FirebaseAdapterService } from '../Adapters/firebase-adapter.service';
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
		private adapter: FirebaseAdapterService,
		private router: Router,
	)
	{
		this.currentSearchResult$ = this.currentSearch.asObservable();
	}

	public loadAll(): void
	{
		this.adapter.loadAll();
	}

	public setActiveColection(id: string)
	{
		this.store.setActive(id);
	}

	public upsert(colection: IColection): void
	{
		try
		{
			this.adapter.upsert(colection);
			this.setActiveColection(colection.id);
			console.info('updated collection: ', colection);
		} catch (e)
		{
			console.error('Failed to create colection ', e);
		}
	}

	public delete(colectionId: string): void
	{
		try
		{
			this.adapter.deleteCol(colectionId);
			this.router.navigateByUrl(`colections`);
		} catch (e)
		{
			console.error('Failed to delete colection ', e);
		}
	}

	public upsertOrUpdateMovie(movie: IMovie, colectionId: string): void
	{
		try
		{
			this.adapter.upsertOrUpdateMovie(movie, colectionId);
		} catch (e)
		{
			console.error('Failed to upsert or update movie ', e);
		}
	}

	public removeMovie(colectionId: string, movieId: string)
	{
		try
		{
			this.adapter.removeMovie(colectionId, movieId);
		} catch (e)
		{
			console.error('Failed to remove movie ', JSON.stringify(e));
		}
	}
	public Search(term: string): void
	{
		this.api.Search(term).subscribe(result => this.currentSearch.next(result));
	}
}
