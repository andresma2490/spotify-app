import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user_access_token = authService.getUserAccessToken();
  if (user_access_token) {
    return true;
  }
  return router.navigate(['/']);
};
