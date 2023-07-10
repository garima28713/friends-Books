import { CanActivateFn } from '@angular/router';

export const authTokenGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token'))
  {
    return true;
  }
  else{
    return false;
  }
  
};
