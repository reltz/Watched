import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IColection } from 'src/app/Models/ApiModels';
import { MainService } from 'src/app/Services/main.service';
import { v4 as makeUuid } from 'uuid';

@Component({
	selector: 'app-create-colection-dialog',
	templateUrl: './create-colection-dialog.component.html',
	styleUrls: ['./create-colection-dialog.component.scss'],
})
export class CreateColectionDialogComponent implements OnInit
{
	public nameControl: FormControl;

	constructor(
		private svc: MainService,
		protected readonly dialogRef: MatDialogRef<CreateColectionDialogComponent>,
	)
	{

	}

	public ngOnInit()
	{
		this.nameControl = new FormControl('', Validators.required);
	}

	public create()
	{
		const colection: IColection = {
			id: makeUuid(),
			name: this.nameControl.value,
			movies: [],
		};

		this.svc.upsert(colection);
		this.dialogRef.close(true);
	}
}
