import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { FirebaseAuthService } from './Services/firebase-auth.service';
import { MainService } from './Services/main.service';

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
		this.svc.loadAll();
		this.router.navigateByUrl('/colections');
	}
}
