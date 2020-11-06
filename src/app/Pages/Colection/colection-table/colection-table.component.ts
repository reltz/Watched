import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { map, takeWhile } from 'rxjs/operators';
import { IColection, IMovie } from 'src/app/Models/ApiModels';
import { WatchedQuery } from 'src/app/State/WatchedQuery';

// export interface IColectionTableRow
// {
// 	Title: string;
// 	Type: string;
// 	Year: string;
// 	RunTime: string;
// 	Genres: string;
// 	Director: string;
// }

@Component({
	selector: 'app-colection-table',
	templateUrl: './colection-table.component.html',
	styleUrls: ['./colection-table.component.scss'],
})
export class ColectionTableComponent implements OnInit, OnDestroy
{
	@Input() public colection: IColection;
	public DataSource: MatTableDataSource<IMovie>;
	public readonly columnNames = ['Title', 'Year', 'Type', 'Director', 'Runtime', 'Genres'];
	private isAlive: boolean = true;

	constructor(
		private query: WatchedQuery,
	) { }

	public ngOnInit(): void
	{
		this.DataSource = new MatTableDataSource<IMovie>();
		this.query.selectEntity(this.colection.id)
			.pipe(
				takeWhile(() => this.isAlive),
				map(col => col.movies),
			)
			.subscribe(movies => this.DataSource.data = movies);
	}

	public ngOnDestroy()
	{
		this.isAlive = false;
	}

}
