import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WatchedQuery } from '../State/WatchedQuery';


@Injectable({
	providedIn: 'root'
})
export class SearchCollectionsService
{
	constructor(
		private query: WatchedQuery,
	) { }

	public searchCollections(name: string): Observable<string[][]>
	{
		return this.query.selectAll()
			.pipe(
				map(collections =>
				{
					let result = [];

					collections.forEach(col =>
					{
						const found = col.movies.find(mov => mov.Title.toLowerCase().includes(name.toLowerCase()));
						if (found)
						{
							result.push([col.name, found.Title]);
						}
					})
					return result;
				}),
			);
	}
}
