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

  // proceedLogin() {
  //   if (this.loginForm.valid) {
  //     this.authService.getByCode(this.loginForm.value.id).subscribe((res) => {
  //       this.userData = res;
  //       console.log(this.userData);
  //       if (this.userData.password === this.loginForm.value.password) {
  //         sessionStorage.setItem('username', this.userData.id);
  //         sessionStorage.setItem('name', this.userData.name);
  //         sessionStorage.setItem('role', this.userData.role);
  //         sessionStorage.setItem('org', this.userData.org);
  //         const logId = sessionStorage.getItem('username');
  //         console.log(logId);
  //         if (this.userData.role === 'Admin') {
  //           this.toast.success('Login Successfully!');
  //           this.route.navigate(['admin', logId, 'dashboard']);
  //         } else if (this.userData.role === 'User') {
  //           this.toast.success('Login Successfully!');
  //           this.route.navigate(['user', logId, 'dashboard']);
  //         }
  //       } else {
  //         this.toast.warning('Invalid credientials!');
  //       }
  //     });
  //   } else {
  //     this.toast.warning('Input credientials!');
  //   }
  // }

  proceedLogin() {
    if (this.loginForm.valid) {
      this.authService.getByCode(this.loginForm.value).subscribe(
        (res: any) => {
          sessionStorage.setItem('user', res.user);
          sessionStorage.setItem('name', res.name);
          sessionStorage.setItem('role', res.role);
          sessionStorage.setItem('org', res.org);

          const id = res.user;
          this.toast.success('Login Successfully!');
          if (res.role === 'Admin') {
            this.route.navigate(['admin', id, 'dashboard']);
          } else if (res.role === 'User') {
            this.route.navigate(['user', id, 'dashboard']);
          }
          console.log(id);
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
