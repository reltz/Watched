import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { IColection } from '../Models/ApiModels';
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
				let confirmImport;
				if (allIds.includes(colection.id))
				{
					confirmImport = confirm('This colection already exist, do you wish to overwrite it?');
					if (confirmImport) { this.mainSvc.upsert(colection); }
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
