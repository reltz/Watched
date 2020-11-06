import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IColection } from '../Models/ApiModels';
import { RoutingService } from '../Services/routing.service';
import { WatchedQuery } from '../State/WatchedQuery';

@Component({
	selector: 'app-navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrls: ['./navigation-menu.component.scss'],
})
export class NavigationMenuComponent implements OnInit
{
	@Input() public title: string;
	public colections$: Observable<IColection[]>;

	constructor(
		private query: WatchedQuery,
		private routerSvc: RoutingService,
	) { }

	public ngOnInit(): void
	{
		this.colections$ = this.query.selectAll();
	}

	public navigateToColection(colId: string)
	{
		this.routerSvc.navigateColection(colId);
	}

}
