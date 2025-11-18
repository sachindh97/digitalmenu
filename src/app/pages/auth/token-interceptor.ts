import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const authReq = token ? req.clone({
    setHeaders:{Authorization:`Bearer ${token}`}
  }) : req;
  return next(authReq).pipe(
    // OPTIONAL: Auto logout if unauthorized
    catchError((error) => {
      if (error.status === 401) {
        // authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
