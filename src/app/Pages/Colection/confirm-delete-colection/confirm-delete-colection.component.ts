import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/Services/main.service';

export interface IDeleteColectionData
{
	name: string;
	id: string;
}

@Component({
	selector: 'app-confirm-delete-colection',
	templateUrl: './confirm-delete-colection.component.html',
	styleUrls: ['./confirm-delete-colection.component.scss'],
})
export class ConfirmDeleteColectionComponent implements OnInit
{
	public colName: string;
	constructor(
		@Inject(MAT_DIALOG_DATA) public deletionData: IDeleteColectionData,
		private svc: MainService,
		protected readonly dialogRef: MatDialogRef<ConfirmDeleteColectionComponent>,
	) { }

	public ngOnInit(): void
	{
		this.colName = this.deletionData.name;
	}

	public confirmDelete()
	{
		this.svc.delete(this.deletionData.id);
		this.dialogRef.close(true);
	}
}
