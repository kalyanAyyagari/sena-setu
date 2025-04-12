import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject the AuthService and Router
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // If user is not authenticated, redirect them to the login page
    // and pass along a returnUrl parameter for redirecting after successful login.
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
