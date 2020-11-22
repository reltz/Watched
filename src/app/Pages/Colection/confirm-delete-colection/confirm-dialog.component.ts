import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/Services/main.service';

export interface IDialogData
{
	title: string;
	message: string;
	btnConfirm: string;
	btnCancel?: string;
}

@Component({
	selector: 'app-confirm-delete-colection',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit
{
	public title: string;
	public message: string;
	public confirmBtn: string = 'Confirm';
	public cancelBtn: string = 'Cancel';

	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: IDialogData,
		private svc: MainService,
		protected readonly dialogRef: MatDialogRef<ConfirmDialogComponent>,
	) { }

	public ngOnInit(): void
	{
		this.title = this.dialogData.title;
		this.message = this.dialogData.message;
		this.confirmBtn = this.dialogData.btnConfirm;
		if (this.dialogData.btnCancel) { this.cancelBtn = this.dialogData.btnCancel; }
	}

	public confirm()
	{
		this.dialogRef.close(true);
	}
}
