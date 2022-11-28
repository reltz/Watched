import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchResultItem } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';

@Component({
	selector: 'app-search-result-wrapper',
	templateUrl: './search-result-wrapper.component.html',
	styleUrls: ['./search-result-wrapper.component.scss'],
})
export class SearchResultWrapperComponent implements OnInit
{
	public searchResult$: Observable<ISearchResultItem[]>;
	constructor(
		private svc: MainService,
	) { }

	public ngOnInit(): void
	{
		this.searchResult$ = this.svc.currentSearchResult$;
	}
}
