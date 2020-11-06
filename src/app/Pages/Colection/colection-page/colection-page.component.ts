import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { IColection } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';
import { RoutingService } from 'src/app/Services/routing.service';
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
	public existingColections: IColection[];

	constructor(
		private query: WatchedQuery,
		private svc: MainService,
		private routingSvc: RoutingService,
	) { }

	public ngOnInit(): void
	{
		this.query.selectAll().pipe(
			takeWhile(() => this.isAlive),
		)
			.subscribe(allColections =>
			{
				this.isEmpty = allColections.length === 0;
				this.existingColections = allColections;
			});
	}

	public navigate(id: string)
	{
		this.routingSvc.navigateColection(id);
	}

	public createColection()
	{

	}

	public ngOnDestroy()
	{
		this.isAlive = false;
	}

}
