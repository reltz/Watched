import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { IColection, IMovie } from '../Models/ApiModels';
import { FirebaseAuthService } from '../Services/firebase-auth.service';
import { WatchedStore } from '../State/WatchedStore';
import { BaseAdapterService } from './base-adapter';

export const dbCollectionName = "Watched";

interface IFirebaseCollection
{
	owner: string;
	ownerEmail: string;
	ownerName: string;
	name: string;
	id: string;
	movies: IMovie[];
}

interface IPostResult
{
	status: string;
	message: string;
	data: Object;
}

interface IDeleteRequestBody
{
	collectionId: string;
}

@Injectable({
	providedIn: 'root',
})
export class FirebaseAdapterService extends BaseAdapterService
{
	// private url = 'https://us-central1-tasklistdb.cloudfunctions.net/app/collection';
	private url = 'http://localhost:5001/tasklistdb/us-central1/app/collection';

	constructor(
		private store: WatchedStore,
		private httpClient: HttpClient,
		private authService: FirebaseAuthService,
	)
	{
		super();
	}

	private getToken(): Promise<string>
	{
		return this.authService.afAuth.idToken.pipe(take(1)).toPromise();
	}

	public async loadAll()
	{
		const token = await this.getToken();
		try
		{
			let result: IColection[];
			const headers = {
				'Content-Type': 'application/json; charset=utf-8',
				'Authorization': `Bearer ${token}`,
			};

			this.httpClient.get(this.url, { headers })
				.pipe(
					take(1),
				)
				.subscribe(data =>
				{
					console.info('data from api: ', data);
					result = this.mapFirebaseToModel(data as IFirebaseCollection[]);
					result.forEach(col =>
					{
						this.store.upsert(col.id, col);
					});
				});
		} catch (error)
		{
			console.warn('error on getting all: ', error);
		}
	}

	public async upsert(colection: IColection)
	{
		const token = await this.getToken();

		const headers = {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `Bearer ${token}`,
		};

		try
		{
			this.httpClient.post(this.url, colection, { headers })
				.pipe(
					take(1),
				)
				.subscribe((result: IPostResult) =>
				{
					if (result.status === "success")
					{
						this.store.upsert(colection.id, colection);
					}
					console.info('status:  ', result.message);
				});

		} catch (ex)
		{
			console.error('error on upsert: ', ex);
		}

	}
	public updateCol(colection: Partial<import("../Models/ApiModels").IColection>)
	{
		throw new Error("Method not implemented.");
	}

	public async deleteCol(colectionId: string)
	{
		const token = await this.getToken();

		const headers = {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `Bearer ${token}`,
		};

		const deleteRequest: IDeleteRequestBody = {
			collectionId: colectionId,
		};

		try
		{
			const deleteUrl = `${this.url}/delete`;
			this.httpClient.post(deleteUrl, deleteRequest, { headers })
				.pipe(
					take(1),
				)
				.subscribe((result: IPostResult) =>
				{
					if (result.status === "success")
					{
						this.store.remove(colectionId);
					}
					console.info('status:  ', result.message);
				});

		} catch (ex)
		{
			console.error('error on delete: ', ex);
		}
	}

	public upsertOrUpdateMovie(movie: IMovie, colectionId: string)
	{
		throw new Error("Method not implemented.");
	}
	public removeMovie(colId: string, movieId: string)
	{
		throw new Error("Method not implemented.");
	}

	private mapFirebaseToModel(cols: IFirebaseCollection[]): IColection[]
	{
		const collections: IColection[] = [];
		cols.forEach(col =>
		{
			collections.push({
				id: col.id,
				movies: col.movies,
				name: col.name,
			});
		});
		return collections;
	}
}
