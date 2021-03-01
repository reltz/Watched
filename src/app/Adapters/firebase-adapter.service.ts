import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IColection, IMovie } from '../Models/ApiModels';
import { FirebaseAuthService } from '../Services/firebase-auth.service';
import { WatchedStore } from '../State/WatchedStore';
import { BaseAdapterService } from './base-adapter';

@Injectable({
	providedIn: 'root',
})
export class FirebaseAdapterService extends BaseAdapterService
{

	constructor(
		private store: WatchedStore,
		private httpClient: HttpClient,
		private authService: FirebaseAuthService,
	)
	{
		super();
	}

	public loadAll()
	{
		throw new Error("Method not implemented.");
	}
	public upsert(colection: IColection)
	{
		throw new Error("Method not implemented.");
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
