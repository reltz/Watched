import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { WatchedQuery } from 'src/app/State/WatchedQuery';

@Component({
	selector: 'app-colection-page',
	templateUrl: './colection-page.component.html',
	styleUrls: ['./colection-page.component.scss'],
})
export class ColectionPageComponent implements OnInit, OnDestroy
{
	public isEmpty: boolean;
	public isAlive = true;
	constructor(
		private query: WatchedQuery,
	) { }

	public ngOnInit(): void
	{
		this.query.selectAll().pipe(
			takeWhile(() => this.isAlive),
		)
			.subscribe(x => this.isEmpty = x.length === 0);
	}

	public createColection()
	{

	}

	public ngOnDestroy()
	{
		this.isAlive = false;
	}

}
