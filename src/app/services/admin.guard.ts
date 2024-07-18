import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const login = inject(LoginService);

  if (login.isLoggedIn() && login.getUserRole() === 'ADMIN') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
