import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageAdapterService
{
	private readonly localDBName: string = 'WatchedLS';

	public getLocalStorageObject(): {}
	{
		return JSON.parse(localStorage.getItem(this.localDBName));
	}

	public setLocalStorageObject(db: {}): void
	{
		localStorage.setItem(this.localDBName, JSON.stringify(db));
	}
}
