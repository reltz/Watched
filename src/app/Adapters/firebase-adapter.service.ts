import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { IColection, IMovie } from '../Models/ApiModels';
import { FirebaseAuthService } from '../Services/firebase-auth.service';
import { WatchedStore } from '../State/WatchedStore';
import { BaseAdapterService } from './base-adapter';

export const dbCollectionName = "Watched";

export interface IFirebaseColection extends IColection
{
	ownerId: string;
}

@Injectable({
	providedIn: 'root',
})
export class FirebaseAdapterService extends BaseAdapterService
{
	private url = 'https://us-central1-tasklistdb.cloudfunctions.net/app/MovieDb';
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
		const headers = new HttpHeaders();
		headers.set('Content-Type', 'application/json; charset=utf-8');
		headers.set('Authorization', `Bearer ${await this.getToken()}`);

		try
		{
			this.httpClient.get(this.url, { headers });
		} catch (error)
		{
			console.warn('error on getting all: ', error);
		}
	}

	public async upsert(colection: IColection)
	{
		const headers = new HttpHeaders();
		headers.set('Content-Type', 'application/json; charset=utf-8');
		headers.set('Authorization', `Bearer ${await this.getToken()}`);

		try
		{
			const firebaseCollection: IFirebaseColection = {
				ownerId: (await this.authService.afAuth.currentUser).uid,
				...colection,
			};

			this.httpClient.post(this.url, firebaseCollection, { headers });

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
