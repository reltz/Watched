import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IMovie, IMovieFromApi, ISearchResult } from '../Models/ApiModels';
import { LocalStorageAdapterService } from './local-storage-adapter.service';

@Injectable({
	providedIn: 'root',
})
export class ApiAdapterService
{
	private apiKey: string = 'apikey=4ed90b3e';
	private url: string = 'http://www.omdbapi.com';

	constructor(
		private http: HttpClient,
		private storage: LocalStorageAdapterService,
	) { }

	public Search(searchTerm: string): Observable<ISearchResult>
	{
		const completeUrl = this.url + this.getSearchParamsAndKey(searchTerm);
		const response = this.http.get<ISearchResult>(completeUrl, { responseType: "json" });
		return response;
	}

	public GetMovie(id: string): Observable<IMovie>
	{
		const completeUrl = this.url + this.getIdParamsAndKey(id);
		return this.http.get<IMovieFromApi>(completeUrl, { responseType: "json" })
			.pipe(
				map(response => this.mapToMovie(response)),
				tap(x => console.info('mapped is ', x)),
			);

	}

	private getSearchParamsAndKey(searchTerm: string): string
	{
		return `/?s=${searchTerm}&${this.apiKey}`;
	}

	private getIdParamsAndKey(id: string): string
	{
		return `/?i=${id}&${this.apiKey}`;
	}

	private mapToMovie(apiMovie: IMovieFromApi): IMovie
	{
		if (apiMovie)
		{
			return {
				Id: apiMovie.imdbID,
				Title: apiMovie.Title,
				Type: apiMovie.Type,
				Year: apiMovie.Year,
				Runtime: apiMovie.Runtime,
				Genres: apiMovie.Genre.split(','),
				Director: apiMovie.Director,
				Actors: apiMovie.Actors.split(','),
				Language: apiMovie.Language,
				Countries: apiMovie.Country.split(','),
				PosterUrl: apiMovie.Poster,
				RottenTomatoesRating: apiMovie.Ratings.length > 1 ? Number((apiMovie.Ratings[1].Value).replace('%', '')) : undefined,
				IMDBRating: Number.parseFloat(apiMovie.Ratings[0].Value) * 10,
				UserRating: 0,
				UserNotes: '',
			};
		}
	}
}

// http://www.omdbapi.com/?s=harry&apikey=4ed90b3e  (s for search, returns multiple results, summarized, nt complete)

// http://www.omdbapi.com/?i=tt0295297&apikey=4ed90b3e  (i for imdb id - complete result, only 1 t for title)
