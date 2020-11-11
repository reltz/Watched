import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiAdapterService } from '../Adapters/api-adapter.service';
import { LocalStorageAdapterService } from '../Adapters/local-storage-adapter.service';
import { IColection, IMovie, ISearchResult } from '../Models/ApiModels';
import { WatchedStore } from '../State/WatchedStore';
import { RoutingService } from './routing.service';

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
		private router: Router,
	)
	{
		this.currentSearchResult$ = this.currentSearch.asObservable();
	}

	public init(): void
	{
		this.storage.init();
	}

	public loadAll(): void
	{
		this.storage.loadAll();
	}

	public setActiveColection(id: string)
	{
		this.store.setActive(id);
	}

	public upsert(colection: IColection): void
	{
		try
		{
			this.storage.upsert(colection);
			this.setActiveColection(colection.id);
			this.router.navigateByUrl(`colection/{{colection.id}}`);
		} catch (e)
		{
			console.warn('Failed to create colection ', e);
		}
	}

	public update(colection: Partial<IColection>): void
	{
		try
		{
			this.storage.updateCol(colection);
		} catch (e)
		{
			console.warn('Failed to update colection ', e);
		}
	}

	public delete(colectionId: string): void
	{
		try
		{
			this.storage.deleteCol(colectionId);
			this.router.navigateByUrl(`colections`);
		} catch (e)
		{
			console.warn('Failed to delete colection ', e);
		}
	}

	public upsertOrUpdateMovie(movie: IMovie, colectionId: string): void
	{
		try
		{
			this.storage.upsertOrUpdateMovie(movie, colectionId);
		} catch (e)
		{
			console.warn('Failed to upsert or update movie ', e);
		}
	}

	public removeMovie(colectionId: string, movieId: string)
	{
		try
		{
			this.storage.removeMovie(colectionId, movieId);
		} catch (e)
		{
			console.warn('Failed to remove movie ', e);
		}
	}
	public Search(term: string): void
	{
		this.api.Search(term).subscribe(result => this.currentSearch.next(result));
	}
}
