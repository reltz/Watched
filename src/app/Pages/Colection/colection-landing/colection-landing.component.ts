import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, takeWhile } from 'rxjs/operators';
import { IColection } from 'src/app/Models/ApiModels';
import { WatchedQuery } from 'src/app/State/WatchedQuery';

@Component({
	selector: 'app-colection-landing',
	templateUrl: './colection-landing.component.html',
	styleUrls: ['./colection-landing.component.scss'],
})
export class ColectionLandingComponent implements OnInit, OnDestroy
{
	public colection: IColection;
	public isAlive = true;

	constructor(
		private query: WatchedQuery,
	) { }

	public ngOnInit(): void
	{
		this.query.selectActive().pipe(
			filter(x => !!x),
			takeWhile(() => this.isAlive),
		).subscribe(col => this.colection = col);

	}

	public ngOnDestroy(): void
	{
		this.isAlive = false;
	}

}
