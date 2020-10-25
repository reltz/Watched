import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchResult } from '../Models/ApiModels';

@Injectable({
	providedIn: 'root',
})
export class ApiAdapterService
{
	private apiKey: string = 'apikey=4ed90b3e';
	private url: string = 'http://www.omdbapi.com';

	constructor(
		private http: HttpClient,
	) { }

	// get(url: string, options?:
	// 	 { headers?: HttpHeaders | { [header: string]: string | string[]; };
	// 	 observe?: "body"; params?: HttpParams | { [param: string]: string | string[]; };
	// 	  reportProgress?: boolean; responseType?: "json"; withCredentials?: boolean; }):
	// 	  Observable<Object>

	public Search(searchTerm: string): Observable<ISearchResult>
	{
		const completeUrl = this.url + this.getSearchParamsAndKey(searchTerm);
		const response = this.http.get<ISearchResult>(completeUrl, { responseType: "json" });
		return response;
	}

	private getSearchParamsAndKey(searchTerm: string): string
	{
		return `/?s=${searchTerm}&${this.apiKey}`;
	}
}

// http://www.omdbapi.com/?s=harry&apikey=4ed90b3e  (s for search, returns multiple results, summarized, nt complete)

// http://www.omdbapi.com/?i=tt0295297&apikey=4ed90b3e  (i for imdb id - complete result, only 1 t for title)
