import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExportImportService } from 'src/app/Services/export-import.service';
import { RestoreDialogComponent } from '../../restore-dialog/restore-dialog.component';

@Component({
	selector: 'app-import-colection-dialog',
	templateUrl: './import-colection-dialog.component.html',
	styleUrls: ['./import-colection-dialog.component.scss'],
})
export class ImportColectionDialogComponent
{

	public fileContent: string;

	constructor(
		protected readonly dialogRef: MatDialogRef<RestoreDialogComponent>,
		protected readonly exportImport: ExportImportService,
	) { }

	public loadFile(fileList: FileList): void
	{
		const file = fileList[0];
		const fileReader: FileReader = new FileReader();
		fileReader.onload = () =>
		{
			this.fileContent = fileReader.result.toString();
		};
		fileReader.readAsText(file);
	}

	public import()
	{
		this.exportImport.importColection(this.fileContent);
		this.dialogRef.close(true);
	}

}
