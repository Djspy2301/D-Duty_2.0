import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toast: ToastrService,
    private authService: AuthService,
    private route: Router
  ) {}

  registerForm = this.builder.group({
    user: this.builder.control('', Validators.required),
    org: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.maxLength(20)])
    ),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    deg: 'Admin',
    role: '',
  });

  proceedReg() {
    this.registerForm.value['role'] = 'Admin';
    if (this.registerForm.valid) {
      this.authService.proceedreg(this.registerForm.value).subscribe((res) => {
        this.toast.success('Registration Successful!');
        this.route.navigate(['']);
      });
    } else {
      this.toast.warning('Pleas enter valid inputs!');
    }
  }
}
