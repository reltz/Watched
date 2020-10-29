import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MainService } from '../../../Services/main.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit
{
	public formControl: FormControl;

	constructor(
		private svc: MainService,
	) { }

	public ngOnInit(): void
	{
		this.formControl = new FormControl('', [Validators.required]);
	}

	public doSearch(): void
	{
		const value = this.formControl.value;
		this.svc.Search(value);
	}
}
