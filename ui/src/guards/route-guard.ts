import {CanActivateFn, RedirectCommand, Router} from '@angular/router';
import {UserAccountService} from '../services/user-account-service';
import {inject} from '@angular/core';

export const routeGuard: CanActivateFn = (route, state) => {
  void route;
  void state;

  const router = inject(Router);
  const userAccountService: UserAccountService = inject(UserAccountService);
  return userAccountService.isAuthenticated.value
    ? true
    : new RedirectCommand(router.parseUrl("/login"))
};
