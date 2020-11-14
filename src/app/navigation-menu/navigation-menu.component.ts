import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IColection } from '../Models/ApiModels';
import { RestoreDialogComponent } from '../Pages/restore-dialog/restore-dialog.component';
import { BackupRestoreService } from '../Services/backup-restore.service';
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
		private backUpRestore: BackupRestoreService,
		protected readonly dialog: MatDialog,
	) { }

	public ngOnInit(): void
	{
		this.colections$ = this.query.selectAll();
	}

	public navigateToColection(colId: string)
	{
		this.routerSvc.navigateColection(colId);
	}

	public backUp()
	{
		const link = document.createElement("a");
		link.href = this.backUpRestore.downloadBackup();

		const dateTime = this.getCurrentDateTime();

		link.download = 'Watched-backup-' + dateTime + '.txt';
		link.click();
	}

	public handleRestore()
	{
		this.dialog.open(RestoreDialogComponent)
			.afterClosed();
	}

	private getCurrentDateTime(): string
	{
		const today = new Date();
		const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
		const dateTime = date + '_' + time;
		return dateTime;
	}
}
