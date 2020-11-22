import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { distinctUntilChanged, distinctUntilKeyChanged, filter, map, takeWhile } from 'rxjs/operators';
import { IColection, IMovie } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';
import { WatchedQuery } from 'src/app/State/WatchedQuery';

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
		this.svc.removeMovie(this.colection.id, movieId);
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
