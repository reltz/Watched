import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IMovieFromApi } from './Models/ApiModels';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit
{
	public title = 'SeriesMovies';
	public movie: IMovieFromApi;

	constructor(private http: HttpClient)
	{

	}

	public ngOnInit()
	{
		this.getMovie().subscribe(x => this.movie = x);
	}

	public getMovie(): Observable<IMovieFromApi>
	{
		const testUrl = 'http://www.omdbapi.com/?i=tt0295297&apikey=4ed90b3e';
		return this.http.get<IMovieFromApi>(testUrl)
			.pipe(
				catchError(this.handleError),
			);
	}

	private handleError(error: any)
	{
		console.error('server error:', error);
		if (error.error instanceof Error)
		{
			const errMessage = error.error.message;
			return Observable.throw(errMessage);
			// Use the following instead if using lite-server
			// return Observable.throw(err.text() || 'backend server error');
		}
		return Observable.throw(error || 'Node.js server error');
	}
}
