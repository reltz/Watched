import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './Services/main.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit
{
	public title = 'Watched!';
	// public response: ISearchResult;

	constructor(
		private svc: MainService,
		private router: Router,
	)
	{

	}
	public ngOnInit()
	{
		this.svc.init();
		this.svc.loadAll();
		this.router.navigateByUrl('/colections');
	}

}
