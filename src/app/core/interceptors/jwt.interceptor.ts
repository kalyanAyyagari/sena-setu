import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the JWT token from the AuthService
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const token = authService.getToken();
  // If a token is available, clone the request and add the Authorization header.
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req).pipe(
    catchError((error: any) => {
      if (
        error?.error?.message === 'Token has expired. Please login again.' ||
        error?.message === 'Token has expired. Please login again.'
      ) {
        authService.logout();
        snackBar.open('Session expired. Please login again.', 'Close', { duration: 5000 });
        router.navigate(['/login']);
      }
      throw error;
    })
  );
};
