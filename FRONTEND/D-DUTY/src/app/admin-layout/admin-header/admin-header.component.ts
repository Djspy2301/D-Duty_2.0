import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css'],
})
export class AdminHeaderComponent {
  constructor(
    private route: Router,
    private toast: ToastrService,
    private adminService: AdminServiceService
  ) {}

  orgName = sessionStorage.getItem('org');

  logout() {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('org');
    this.toast.success('Logout Successfully!');
    this.route.navigate(['login']);
  }

  id() {
    this.adminService.getIdFromSessionStorage();
  }
}
