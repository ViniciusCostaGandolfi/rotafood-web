import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user/current-user.service';
import { inject } from '@angular/core';

export const logedGuard: CanActivateFn = (route, state) => {
  
  const currentUserService = inject(CurrentUserService)
  const routerService = inject(Router)
  if (!currentUserService.hasLogged()) {
      return routerService.createUrlTree(['/entrar'])
  }
  return true
};
