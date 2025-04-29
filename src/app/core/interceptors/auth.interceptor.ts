import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { environment } from '@env/environment';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const access_token = authService.getAccessToken();

  const fetchAccessToken = () => {
    return authService.fetchAccessToken().pipe(
      switchMap((res) => {
        const reqWithAuth = req.clone({
          setHeaders: {
            Authorization: `Bearer ${res.access_token}`,
          },
        });
        return next(reqWithAuth);
      }),
    );
  };

  if (!req.url.startsWith(`${environment.apiUrl}`)) {
    return next(req);
  }

  if (access_token) {
    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return next(reqWithAuth).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return fetchAccessToken();
        }
        return throwError(() => error);
      }),
    );
  }

  return fetchAccessToken();
};
