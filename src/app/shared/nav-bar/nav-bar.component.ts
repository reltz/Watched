import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/auth.service';
import { WatchedStore } from '../../core/watched-store';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatMenuModule, MatButtonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(WatchedStore);

  readonly collections = this.store.collections;
  readonly user = this.auth.user;

  goToCollection(id: string): void {
    this.router.navigate(['/collection', id]);
  }

  async logout(): Promise<void> {
    await this.auth.logout();
    this.store.reset();
    this.router.navigate(['/login']);
  }
}
