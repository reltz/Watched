import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, take, takeWhile, tap } from 'rxjs/operators';
import { IColection } from 'src/app/Models/ApiModels';
import { ExportImportService } from 'src/app/Services/export-import.service';
import { MainService } from 'src/app/Services/main.service';
import { WatchedQuery } from 'src/app/State/WatchedQuery';
import { ColectionTableComponent } from '../colection-table/colection-table.component';
import { ConfirmDialogComponent } from '../confirm-delete-colection/confirm-dialog.component';

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
	public colectionNameControl: FormControl;

	constructor(
		private query: WatchedQuery,
		private svc: MainService,
		private exportImport: ExportImportService,
		private dialog: MatDialog,
		private route: ActivatedRoute,
	) { }

	public ngOnInit(): void
	{
		this.colectionNameControl = new FormControl('', Validators.required);
		this.route.params.pipe(
			map(params => params['id']),
			takeWhile(() => this.isAlive),
			switchMap(id => this.query.selectEntity(id)),
			filter(x => !!x),
		).subscribe(col =>
		{
			this.colection = col;
			this.colectionNameControl.setValue(col.name);
		});

		this.colectionNameControl = new FormControl(this.colection.name, Validators.required);
	}

	public save()
	{
		try
		{
			const colect: IColection = this.colTable.getUpdatedColection();
			colect.name = this.colectionNameControl.value;
			this.svc.upsert(colect);
		} catch (e)
		{
			console.error('failed to save table');
		}
	}

	public delete()
	{
		const message = `Are you sure you want to delete Colection: "${this.colection.name}"? This cannot be undone.`;
		const title = `Confirm deletion`;
		const btnConfirm = 'Delete';

		this.dialog.open(ConfirmDialogComponent, { data: { message, title, btnConfirm } })
			.afterClosed()
			.pipe(
				take(1),
				filter(confirmed => !!confirmed),
			)
			.subscribe(() => this.svc.delete(this.colection.id));

	}

	public export()
	{
		this.exportImport.exportColection(this.colection);
	}

	public ngOnDestroy(): void
	{
		this.isAlive = false;
	}

}
