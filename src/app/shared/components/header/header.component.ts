import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  isAuthPage(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/login') || currentUrl.includes('/signup');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Logout clicked');
  }

  goToProfile(): void {
    this.router.navigate(['/account-management']);
    console.log('Profile clicked');
  }

  goToUnits(): void {
    this.router.navigate(['/units']);
    console.log('Units clicked');
  }
}
