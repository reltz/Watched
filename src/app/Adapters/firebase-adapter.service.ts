import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { IColection, IMovie } from '../Models/ApiModels';
import { FirebaseAuthService } from '../Services/firebase-auth.service';
import { WatchedStore } from '../State/WatchedStore';
import { BaseAdapterService } from './base-adapter';

export const dbCollectionName = "Watched";

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
		console.warn('token is: ', token);

		try
		{
			let result;
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
					result = data;
					console.info('loadAll result is ', result);
				});
		} catch (error)
		{
			console.warn('error on getting all: ', error);
		}
	}

	public async upsert(colection: IColection)
	{
		const token = await this.getToken();
		console.warn('token is: ', token);

		const headers = {
			'Content-Type': 'application/json; charset=utf-8',
			'Authorization': `Bearer ${token}`,
		};

		try
		{
			let result;
			this.httpClient.post(this.url, colection, { headers })
				.pipe(
					take(1),
				)
				.subscribe(data =>
				{
					result = data;
					console.info('post result is ', result);
				});

		} catch (ex)
		{
			console.error('error on post: ', ex);
		}

	}
	public updateCol(colection: Partial<import("../Models/ApiModels").IColection>)
	{
		throw new Error("Method not implemented.");
	}
	public deleteCol(colectionId: string)
	{
		throw new Error("Method not implemented.");
	}
	public upsertOrUpdateMovie(movie: IMovie, colectionId: string)
	{
		throw new Error("Method not implemented.");
	}
	public removeMovie(colId: string, movieId: string)
	{
		throw new Error("Method not implemented.");
	}
}
