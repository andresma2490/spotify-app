import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '@env/environment';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.startsWith(`${environment.apiUrl}`)) {
    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.access_token}`,
      },
    });
    return next(reqWithAuth);
  }

  return next(req);
};
