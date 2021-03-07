import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from 'src/app/Services/firebase-auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './watched-login.component.html',
	styleUrls: ['./watched-login.component.scss'],
})
export class WatchedLoginComponent implements OnInit
{
	constructor(public authService: FirebaseAuthService) { }

	public ngOnInit()
	{
	}
}
