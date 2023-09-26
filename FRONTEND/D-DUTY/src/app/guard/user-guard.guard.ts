import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const UserAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toast = inject(ToastrService);
  const userRole = authService.getUserRole();

  if (userRole === 'User') {
    return true;
  } else if (userRole !== 'Admin') {
    router.navigate([state.url]);
    return false;
  } else {
    router.navigate(['']);
    return false;
  }
};
