import { Injectable } from '@angular/core';
import { IColection } from '../Models/ApiModels';
import { FileUtilsService } from './file-utils.service';

@Injectable({
	providedIn: 'root',
})
export class ExportImportService
{
	constructor(
		private readonly fileUtils: FileUtilsService,
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
}
