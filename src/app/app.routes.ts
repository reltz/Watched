import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'collections',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/collections/collections.component').then((m) => m.CollectionsComponent),
  },
  {
    path: 'collection/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/collection-detail/collection-detail.component').then(
        (m) => m.CollectionDetailComponent,
      ),
  },
  {
    path: 'search',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/search/search.component').then((m) => m.SearchComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'collections' },
  { path: '**', redirectTo: 'collections' },
];
