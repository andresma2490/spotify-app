import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user_access_token = localStorage.getItem('user_access_token');
  if (user_access_token) {
    return true;
  }
  return router.navigate(['/']);
};
