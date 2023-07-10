import { CanActivateFn } from '@angular/router';

export const rolePermissionAdminGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('role') === 'Admin' )
  {
    return true;
  }
  else
  {
    return false;
  }
  
};
