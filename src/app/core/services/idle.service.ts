import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private timeoutId: any;
  private readonly timeoutMs = 15 * 60 * 1000; // 15 minutes
  // private readonly timeoutMs = 10 * 1000; // 10 seconds for testing

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {}

  public startWatching(): void {
    this.resetTimer();
    ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(event => {
      window.addEventListener(event, this.resetTimer.bind(this), true);
    });
  }

  private resetTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.ngZone.run(() => {
        this.authService.logout();
        this.snackBar.open('logged out due to inactivity', 'Close', {
          duration: 0,
        });
        this.router.navigate(['/login']);
      });
    }, this.timeoutMs);
  }

  public stopWatching(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(event => {
      window.removeEventListener(event, this.resetTimer.bind(this), true);
    });
  }
}
