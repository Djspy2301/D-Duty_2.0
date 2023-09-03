import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router)
  const authService=inject(AuthService)
  const toast=inject(ToastrService)

  if(authService.isLoggedIn()){
    return true;
  }else{
    router.navigate(['']);
    return false;
  }

  
};
