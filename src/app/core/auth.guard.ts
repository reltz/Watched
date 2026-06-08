import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { authState, Auth, User } from '@angular/fire/auth';

/** Blocks routes until Firebase confirms the user is signed in. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1),
    map((user: User | null) => (user ? true : router.createUrlTree(['/login']))),
  );
};
