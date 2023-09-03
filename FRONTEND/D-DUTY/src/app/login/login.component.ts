import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toast: ToastrService,
    private authService: AuthService, private route: Router) { }

  userData: any;

  loginForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedLogin() {
    if (this.loginForm.valid) {
      //   this.authService.proceedreg(this.loginForm.value).subscribe(res => {
      //     this.toast.success('Registration Successful!');
      //     this.route.navigate(['dashboard']);
      //   })
      // } else {
      //   this.toast.warning('Pleas enter valid inputs!');
      this.authService.getByCode(this.loginForm.value.id).subscribe(res => {
        this.userData = res;
        console.log(this.userData);
        if (this.userData.password === this.loginForm.value.password) {
          sessionStorage.setItem('username', this.userData.id);
          sessionStorage.setItem('role', this.userData.role);
          this.route.navigate(['dashboard']);
          this.toast.success('Login Successfully!');
        } else {
          this.toast.warning('Invalid credientials!');
        }
      })
    }

  }
}
