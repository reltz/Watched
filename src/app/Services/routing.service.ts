import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';

@Injectable({
	providedIn: 'root',
})
export class RoutingService
{
	constructor(
		private router: Router,
		private svc: MainService,
	) { }

	public navigateColection(id: string)
	{
		this.svc.setActiveColection(id);
		this.router.navigateByUrl(`colection`);
	}

	public navigateColectionHome()
	{
		this.router.navigateByUrl(`colections`);
	}
}
