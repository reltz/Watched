import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
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
	public searchSubscription: Subscription;

	constructor(
		private svc: SearchCollectionsService,
	) { }

	public ngOnInit(): void
	{
		this.formControl = new FormControl('', [Validators.required]);

		this.searchSubscription = this.formControl.valueChanges.pipe(
			switchMap(value => !!value ? this.svc.searchCollections(value as string) : of([])),
		)
			.subscribe(result =>
			{
				this.noResult = result.length < 1 ? true : false;
				this.searchResult = result;
			});
	}

	public ngOnDestroy(): void
	{
		this.searchSubscription.unsubscribe();
	}

	// public doSearch(): void
	// {
	// 	this.svc.searchCollections(this.formControl.value)
	// 		.subscribe((result) =>
	// 		{
	// 			this.noResult = result.length < 1 ? true : false;
	// 			this.searchResult = result;
	// 		})
	// 		.unsubscribe();
	// }
}
