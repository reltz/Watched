import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISearchResultItem } from 'src/app/Models/ApiModels';
import { AddToColectionDialogComponent } from '../add-to-colection-dialog/add-to-colection-dialog.component';

@Component({
	selector: 'app-search-result-item',
	templateUrl: './search-result-item.component.html',
	styleUrls: ['./search-result-item.component.scss'],
})
export class SearchResultItemComponent implements OnInit
{
	@Input() public resultItem: ISearchResultItem;

	constructor(
		private dialog: MatDialog,
	)
	{ }

	public ngOnInit(): void
	{
	}

	public openDialog()
	{
		this.dialog.open(
			AddToColectionDialogComponent, { data: { id: this.resultItem.imdbID } },
		).afterClosed();
	}
}
