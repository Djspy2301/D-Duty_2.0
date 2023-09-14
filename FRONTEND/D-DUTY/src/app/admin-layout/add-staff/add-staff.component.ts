import { group } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css'],
})
export class AddStaffComponent {
  constructor(
    private builder: FormBuilder,
    private adminService: AdminServiceService,
    private toast: ToastrService,
    private route: Router
  ) {}
  regStaff = this.builder.group({
    user: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    deg: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.maxLength(15)])
    ),
    regBy: '',
    role: '',
  });
  addStaff() {
    this.regStaff.value['role'] = 'User';
    this.regStaff.value['regBy'] = sessionStorage.getItem('user');
    if (this.regStaff.valid) {
      this.adminService.addStaff(this.regStaff.value).subscribe((res) => {
        this.toast.success('Registration Successful!');
        this.regStaff.reset();
      });
    } else {
      this.toast.warning('Pleas enter valid inputs!');
    }
  }

  id = this.adminService.getIdFromSessionStorage();
}
