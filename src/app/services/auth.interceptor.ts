import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //add jwt token
  const loginService = inject(LoginService);
  const token = loginService.getToken(); // Retrieve the token from the LoginService

  const authRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authRequest);
};
