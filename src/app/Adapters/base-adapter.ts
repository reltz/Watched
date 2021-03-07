import { IColection, IMovie } from '../Models/ApiModels';
import { WatchedStore } from '../State/WatchedStore';

export abstract class BaseAdapterService
{
	public abstract loadAll();

	/* Colections */
	public abstract upsert(colection: IColection);

	public abstract updateCol(colection: Partial<IColection>);

	public abstract deleteCol(colectionId: string);

	public abstract upsertOrUpdateMovie(movie: IMovie, colectionId: string);

	public abstract removeMovie(colId: string, movieId: string);
}
