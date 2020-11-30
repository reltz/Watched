import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiAdapterService } from 'src/app/Adapters/api-adapter.service';
import { IColection, IMovie } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';
import { WatchedQuery } from 'src/app/State/WatchedQuery';

export interface IAddToDialogData
{
	id?: string;
	movie?: IMovie;
	title?: string;
}

@Component({
	selector: 'app-add-to-colection-dialog',
	templateUrl: './add-to-colection-dialog.component.html',
	styleUrls: ['./add-to-colection-dialog.component.scss'],
})
export class AddToColectionDialogComponent implements OnInit
{
	public colections$: Observable<IColection[]>;
	public colectionIdControl: FormControl;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: IAddToDialogData,
		private readonly svc: MainService,
		private readonly api: ApiAdapterService,
		private readonly query: WatchedQuery,
		protected readonly dialogRef: MatDialogRef<AddToColectionDialogComponent>,
	) { }

	public ngOnInit(): void
	{
		if (!this.data.title) { this.data.title = 'Add to Collection'; }
		this.colectionIdControl = new FormControl('', Validators.required);
		this.colections$ = this.query.selectAll();
	}

	public addMovieToColection()
	{
		if (this.data.movie)
		{
			this.svc.upsertOrUpdateMovie(this.data.movie, this.colectionIdControl.value);
			this.dialogRef.close(true);
		}
		else
		{
			this.api.GetMovie(this.data.id)
				.pipe(
				)
				.subscribe(mov =>
				{
					this.svc.upsertOrUpdateMovie(mov, this.colectionIdControl.value);
					this.dialogRef.close(true);
				});
		}

	}
}
