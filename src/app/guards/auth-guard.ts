import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuth } from '../services/user-auth';

export const authGuard: CanActivateFn = () => {
 let _userAuthService =  inject(UserAuth)
 let router = inject(Router)
 if(_userAuthService.getUserLogged()){
  return true;
 }
 else{
  router.navigateByUrl('/login')
  return false;
 }
};
