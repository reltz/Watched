import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { CollectionsService } from './core/collections.service';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly auth = inject(AuthService);
  private readonly collections = inject(CollectionsService);

  readonly isLoggedIn = this.auth.isLoggedIn;

  constructor() {
    // Whenever a user signs in, (re)load their collections from the backend.
    effect(() => {
      if (this.auth.isLoggedIn()) {
        this.collections.loadAll();
      }
    });
  }
}
