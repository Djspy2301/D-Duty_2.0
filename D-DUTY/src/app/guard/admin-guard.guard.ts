import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

export const AdminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toast = inject(ToastrService);
  const userRole = authService.getUserRole();
  const currenturl = router.url;
  const dashboard = 'admin/dashboard';
  if (userRole === 'Admin') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
