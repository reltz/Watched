import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
	providedIn: 'root',
})
export class FirebaseAuthService
{
	constructor(
		public afAuth: AngularFireAuth, // Inject Firebase auth service
	) { }

	// Sign in with Google
	public GoogleAuth()
	{
		return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
	}

	// Auth logic to run auth providers
	public AuthLogin(provider)
	{
		return this.afAuth.signInWithPopup(provider)
			.then(async (result) =>
			{
				console.info('You have been successfully logged in!');
				// console.warn('user is: ', await this.afAuth.currentUser);
			}).catch((error) =>
			{
				console.error(error);
			});
	}
}
