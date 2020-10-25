import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiAdapterService } from '../Adapters/api-adapter.service';
import { ISearchResult } from '../Models/ApiModels';

@Injectable({
	providedIn: 'root',
})
export class MainService
{
	private currentSearch: BehaviorSubject<ISearchResult> = new BehaviorSubject<ISearchResult>({ Search: [], Response: "", totalResults: "" });
	public currentSearchResult$: Observable<ISearchResult>;

	constructor(
		private api: ApiAdapterService,
	)
	{
		this.currentSearchResult$ = this.currentSearch.asObservable();
	}

	public Search(term: string): void
	{
		this.api.Search(term).subscribe(result => this.currentSearch.next(result));
	}
}
