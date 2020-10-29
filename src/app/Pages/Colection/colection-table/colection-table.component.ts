import { Component, OnInit } from '@angular/core';
import { IColection } from 'src/app/Models/ApiModels';

@Component({
	selector: 'app-colection-table',
	templateUrl: './colection-table.component.html',
	styleUrls: ['./colection-table.component.scss'],
})
export class ColectionTableComponent implements OnInit
{
	public colection: IColection;
	constructor() { }

	public ngOnInit(): void
	{

	}

}
