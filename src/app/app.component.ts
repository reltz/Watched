import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { FirebaseAuthService } from './Services/firebase-auth.service';
import { MainService } from './Services/main.service';
import { WatchedStore } from './State/WatchedStore';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit
{
	public title = 'Watched!';
	public isLoggedIn$: Observable<boolean>;
	// public response: ISearchResult;

	constructor(
		private store: WatchedStore,
		private svc: MainService,
		private router: Router,
		private authSvc: FirebaseAuthService,
	)
	{

	}
	public ngOnInit()
	{
		this.isLoggedIn$ = this.authSvc.afAuth.authState.pipe(
			map(user => !!user),
		);

		// this.svc.init();
		this.isLoggedIn$.
			pipe(
				filter(isLoggedIn => !!isLoggedIn),
				tap(() => this.store.reset()),
			).subscribe(() => this.svc.loadAll());

		this.router.navigateByUrl('/colections');
	}
}
