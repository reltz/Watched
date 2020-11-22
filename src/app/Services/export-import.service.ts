import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, take } from 'rxjs/operators';
import { IColection } from '../Models/ApiModels';
import { ConfirmDialogComponent, IDialogData } from '../Pages/Colection/confirm-delete-colection/confirm-dialog.component';
import { WatchedQuery } from '../State/WatchedQuery';
import { FileUtilsService } from './file-utils.service';
import { MainService } from './main.service';

@Injectable({
	providedIn: 'root',
})
export class ExportImportService
{
	constructor(
		private readonly fileUtils: FileUtilsService,
		private readonly mainSvc: MainService,
		private readonly query: WatchedQuery,
		private dialog: MatDialog,
	) { }

	private fileUrl: any;

	public exportColection(colection: IColection)
	{
		const stringCol = JSON.stringify(colection);

		const blob = new Blob([stringCol], { type: 'text/json' });

		this.fileUrl = this.fileUtils.createObjectURL(blob, this.fileUrl);

		const link = document.createElement("a");
		link.href = this.fileUrl;
		const dateTime = this.fileUtils.getCurrentDateTime();

		link.download = `${colection.name}-${dateTime}.json`;
		link.click();
	}

	public importColection(content: string)
	{
		let colection: IColection;
		let allIds: string[];
		this.query.selectAll().
			pipe(
				take(1),
				map(cols => cols.map(item => item.id)),
			)
			.subscribe(ids => allIds = ids);

		if (content)
		{
			try
			{
				colection = JSON.parse(content);
				if (allIds.includes(colection.id))
				{
					const data: IDialogData = {
						title: 'Confirm overwrite',
						message: 'A colection with this ID already exists. If you continue with the import it will overwrite the existing colection.',
						btnConfirm: 'Import anyway',
					};
					this.dialog.open(ConfirmDialogComponent, { data })
						.afterClosed()
						.pipe(
							take(1),
							filter(confirmed => !!confirmed),
						)
						.subscribe(() => this.mainSvc.upsert(colection));
				}
				else
				{
					this.mainSvc.upsert(colection);
				}

			} catch (e)
			{
				console.warn('Error: ', JSON.stringify(e));
			}
		}
	}
}
