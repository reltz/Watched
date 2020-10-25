import { Component, Input, OnInit } from '@angular/core';
import { ISearchResultItem } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';

@Component({
	selector: 'app-search-result-item',
	templateUrl: './search-result-item.component.html',
	styleUrls: ['./search-result-item.component.scss'],
})
export class SearchResultItemComponent implements OnInit
{
	@Input() public resultItem: ISearchResultItem;

	constructor(
	)
	{ }

	public ngOnInit(): void
	{
	}
}
