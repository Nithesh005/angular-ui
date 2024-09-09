import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const AccessToken =localStorage.getItem('AccessToken');
  if(AccessToken)
  {
    return true;
  }
  else
  {
    window.location.href = '/auth/sign-in';
    return false;
  }
  
};
