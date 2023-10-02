import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toast: ToastrService,
    private authService: AuthService,
    private route: Router
  ) {}

  userData: any;

  loginForm = this.builder.group({
    user: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.getByCode(this.loginForm.value).subscribe(
        (res: any) => {
          const id = res.user;
          this.toast.success('Login Successfully!');
          if (res.role === 'Admin') {
            sessionStorage.setItem('user', res.user);
            sessionStorage.setItem('name', res.name);
            sessionStorage.setItem('role', res.role);
            sessionStorage.setItem('org', res.org);
            this.route.navigate(['admin', id, 'dashboard']).then(() => {
              window.location.reload();
            });
          } else if (res.role === 'User') {
            sessionStorage.setItem('user', res.user);
            sessionStorage.setItem('name', res.name);
            sessionStorage.setItem('role', res.role);
            sessionStorage.setItem('regBy', res.regBy);
            this.route.navigate(['user', id, 'dashboard']).then(() => {
              window.location.reload();
            });
          }
        },
        (error: any) => {
          this.toast.warning('Invalid credentials!');
        }
      );
    } else {
      this.toast.warning('Input credentials!');
    }
  }
}
