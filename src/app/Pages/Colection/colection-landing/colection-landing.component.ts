import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, takeWhile } from 'rxjs/operators';
import { IColection } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';
import { WatchedQuery } from 'src/app/State/WatchedQuery';
import { ColectionTableComponent } from '../colection-table/colection-table.component';
import { ConfirmDeleteColectionComponent } from '../confirm-delete-colection/confirm-delete-colection.component';

@Component({
	selector: 'app-colection-landing',
	templateUrl: './colection-landing.component.html',
	styleUrls: ['./colection-landing.component.scss'],
})
export class ColectionLandingComponent implements OnInit, OnDestroy
{
	@ViewChild(ColectionTableComponent) public colTable: ColectionTableComponent;
	public colection: IColection;
	public isAlive = true;

	constructor(
		private query: WatchedQuery,
		private svc: MainService,
		private dialog: MatDialog,
	) { }

	public ngOnInit(): void
	{
		this.query.selectActive().pipe(
			filter(x => !!x),
			takeWhile(() => this.isAlive),
		).subscribe(col => this.colection = col);
	}

	public save()
	{
		try
		{
			const colect: IColection = this.colTable.getUpdatedColection();
			this.svc.update(this.colTable.getUpdatedColection());
			alert('Saved !');
		} catch (e)
		{
			console.info('failed to save table');
		}
	}

	public delete()
	{
		this.dialog.open(ConfirmDeleteColectionComponent, { data: { name: this.colection.name, id: this.colection.id } })
			.afterClosed();
	}

	public ngOnDestroy(): void
	{
		this.isAlive = false;
	}

}
