import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor() {
    // Once authenticated, leave the login screen.
    effect(() => {
      if (this.auth.isLoggedIn()) {
        this.router.navigate(['/collections']);
      }
    });
  }

  async login(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      await this.auth.loginWithGoogle();
    } catch {
      this.error.set('Sign in failed. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}
