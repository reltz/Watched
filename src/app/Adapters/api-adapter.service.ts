import { HttpClient } from '@angular/common/http';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMovie, IMovieFromApi, ISearchResult, ISearchResultItem } from '../Models/ApiModels';
import { LocalStorageAdapterService } from './local-storage-adapter.service';

@Injectable({
	providedIn: 'root',
})
export class ApiAdapterService
{
	private apiKey: string = 'apikey=4ed90b3e';
	private url: string = 'https://www.omdbapi.com';

	constructor(
		private http: HttpClient,
		private storage: LocalStorageAdapterService,
	) { }

	public async Search(searchTerm: string): Promise<ISearchResultItem[]>
	{
		const completeUrl = this.url + this.getSearchParamsAndKey(searchTerm);

		// observable (deprecated)
		// const response = this.http.get<ISearchResult>(completeUrl, { responseType: "json" });

		const resp = await Promise.all(
			[
				fetch(completeUrl),
				fetch(completeUrl + "&page=2"),
				fetch(completeUrl + "&page=3")
			]);

		const r1 = (await resp[0].json()).Search;
		const r2 = (await resp[1].json()).Search;
		const r3 = (await resp[2].json()).Search;

		let result = [];
		if (r1) { result.push(...r1) }
		if (r2) { result.push(...r2) }
		if (r3) result.push(...r3);

		return result;
	}

	public GetMovie(id: string): Observable<IMovie>
	{
		const completeUrl = this.url + this.getIdParamsAndKey(id);
		return this.http.get<IMovieFromApi>(completeUrl, { responseType: "json" })
			.pipe(
				map(response => this.mapToMovie(response)),
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
				IMDBRating: apiMovie.Ratings.length > 1 ? Number.parseFloat(apiMovie.Ratings[0].Value) * 10 : undefined,
				UserRating: undefined,
				UserNotes: '',
			};
		}
	}
}

// http://www.omdbapi.com/?s=harry&apikey=4ed90b3e  (s for search, returns multiple results, summarized, nt complete)

// http://www.omdbapi.com/?i=tt0295297&apikey=4ed90b3e  (i for imdb id - complete result, only 1 t for title)
