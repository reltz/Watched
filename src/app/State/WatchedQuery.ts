import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { IColection } from '../Models/ApiModels';
import { WatchedState, WatchedStore } from './WatchedStore';

/**
 * Query - part of the @datorama/akita library for state management. this should be used to retrieve information from the store.
 */
@Injectable()
export class WatchedQuery extends QueryEntity<WatchedState> {

	constructor(protected store: WatchedStore)
	{
		super(store);
	}

	public activeColection$: Observable<IColection> = this.select()
		.pipe(
			map(state => state.active),
			filter(active => active !== ''),
			switchMap(id => this.selectEntity(id)),
		);

	public isThereActive$ = this.select()
		.pipe(
			map(state => state.active),
			map(active =>
			{
				return active === '' || active === null
					? false : true;
			}),
		);
}
