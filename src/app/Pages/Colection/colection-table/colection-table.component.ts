import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged, distinctUntilKeyChanged, filter, map, take, takeWhile } from 'rxjs/operators';
import { IColection, IMovie } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';
import { WatchedQuery } from 'src/app/State/WatchedQuery';
import { ConfirmDialogComponent, IDialogData } from '../confirm-delete-colection/confirm-dialog.component';

@Component({
	selector: 'app-colection-table',
	templateUrl: './colection-table.component.html',
	styleUrls: ['./colection-table.component.scss'],
})
export class ColectionTableComponent implements OnInit, OnDestroy
{
	@Input() public colection: IColection;
	public DataSource: MatTableDataSource<IMovie>;
	public formArray: FormArray;
	public userEditedGroup: FormGroup;
	public readonly columnNames = ['Poster', 'Title', 'Year', 'Type', 'Director', 'Runtime', 'Genres', 'Actors', 'Notes', 'IMDBRating', 'RTRating', 'UserRating', 'Actions'];
	private isAlive: boolean = true;

	constructor(
		private query: WatchedQuery,
		private svc: MainService,
		private readonly dialog: MatDialog,
	) { }

	public ngOnInit(): void
	{
		this.formArray = new FormArray([]);

		this.DataSource = new MatTableDataSource<IMovie>();
		this.query.selectEntity(this.colection.id)
			.pipe(
				takeWhile(() => this.isAlive),
				filter(col => !!col && !!col.movies),
				map(col => col.movies),
			)
			.subscribe(movies =>
			{
				this.DataSource.data = movies;
				movies.forEach(each =>
				{
					this.formArray.push(this.createFormGroup(each));
				});
			});
	}

	public getUpdatedColection(): IColection
	{
		const updatedColection: IColection = {
			id: this.colection.id,
			name: this.colection.name,
			movies: this.colection.movies.map(movie => this.mapToMovie(movie)),
		};
		return updatedColection;
	}

	public ngOnDestroy()
	{
		this.isAlive = false;
	}

	public removeMovie(movieId)
	{
		const data: IDialogData = {
			title: 'Confirm deletion',
			message: `Are you sure you want to remove movie from colection?`,
			btnConfirm: 'Delete',
		};
		this.dialog.open(ConfirmDialogComponent, { data })
			.afterClosed()
			.pipe(
				take(1),
				filter(confirmed => !!confirmed),
			)
			.subscribe(() => this.svc.removeMovie(this.colection.id, movieId));
	}

	private mapToMovie(movie: IMovie): IMovie
	{
		const movieToSave: IMovie = Object.assign({}, movie);
		const index = this.formArray.controls.findIndex(fg => (fg as FormGroup).controls.id.value === movie.Id);
		movieToSave.UserNotes = (this.formArray.controls[index] as FormGroup).controls.userNotes.value;
		movieToSave.UserRating = (this.formArray.controls[index] as FormGroup).controls.userRating.value;
		return movieToSave;
	}

	private createFormGroup(movie: IMovie)
	{
		return new FormGroup({
			id: new FormControl(movie.Id),
			userRating: new FormControl(movie.UserRating),
			userNotes: new FormControl(movie.UserNotes),
		});
	}

}
