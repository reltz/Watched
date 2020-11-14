import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BackupRestoreService } from 'src/app/Services/backup-restore.service';

@Component({
	selector: 'app-restore-dialog',
	templateUrl: './restore-dialog.component.html',
	styleUrls: ['./restore-dialog.component.scss'],
})
export class RestoreDialogComponent
{
	public fileContent: string;

	constructor(
		protected readonly dialogRef: MatDialogRef<RestoreDialogComponent>,
		protected readonly backUpService: BackupRestoreService,
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

	public restore()
	{
		this.backUpService.restore(this.fileContent);
		this.dialogRef.close(true);
	}

}
