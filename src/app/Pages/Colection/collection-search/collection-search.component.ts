import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ISearchResult } from 'src/app/Models/ApiModels';
import { SearchCollectionsService } from 'src/app/Services/search-collections.service';

@Component({
	selector: 'app-collection-search',
	templateUrl: './collection-search.component.html',
	styleUrls: ['./collection-search.component.scss']
})
export class CollectionSearchComponent implements OnInit
{
	public formControl: FormControl;
	public searchResult: string[][];
	public noResult: boolean;

	constructor(
		private svc: SearchCollectionsService,
	) { }

	public ngOnInit(): void
	{
		this.formControl = new FormControl('', [Validators.required]);
	}

	public doSearch(): void
	{
		this.svc.searchCollections(this.formControl.value)
			.subscribe((result) =>
			{
				this.noResult = result.length < 1 ? true : false;
				this.searchResult = result;
			})
			.unsubscribe();
	}
}
