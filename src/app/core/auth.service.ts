import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Auth,
  GoogleAuthProvider,
  User,
  authState,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { map } from 'rxjs';

/**
 * Wraps Firebase authentication. Exposes the current user as a signal and
 * provides the ID token used to authorize calls to the collections API.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly auth = inject(Auth);

  /** Current Firebase user (null when signed out, undefined while resolving). */
  readonly user = toSignal<User | null>(authState(this.auth));

  /** Becomes true/false once Firebase has resolved the auth state. */
  readonly isLoggedIn = toSignal(
    authState(this.auth).pipe(map((user) => !!user)),
    { initialValue: undefined },
  );

  loginWithGoogle(): Promise<unknown> {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  async getToken(): Promise<string> {
    const current = this.auth.currentUser;
    return current ? current.getIdToken() : '';
  }
}
