import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeWhile } from 'rxjs/operators';
import { IColection } from 'src/app/Models/ApiModels';
import { RoutingService } from 'src/app/Services/routing.service';
import { WatchedQuery } from 'src/app/State/WatchedQuery';
import { CreateColectionDialogComponent } from '../create-colection-dialog/create-colection-dialog.component';

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
		private routingSvc: RoutingService,
		private dialog: MatDialog,
	) { }

	public ngOnInit(): void
	{
		console.warn(this.query.getActive());
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
		this.dialog.open(CreateColectionDialogComponent)
			.afterClosed();
	}

	public ngOnDestroy()
	{
		this.isAlive = false;
	}

}
