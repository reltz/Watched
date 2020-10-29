import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { IColection } from '../Models/ApiModels';

export interface WatchedState extends EntityState<IColection>
{
	active: string;
}

export function createInitialState(): WatchedState
{
	return {
		active: '',
	};
}

/**
 * Store - part of the @datorama/akita library architecture for state management
 */
@StoreConfig({ name: 'watchedStore' })
export class WatchedStore extends EntityStore<WatchedState, IColection>{
	constructor()
	{
		super(createInitialState());
	}
}
