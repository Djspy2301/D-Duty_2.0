import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css'],
})
export class UserHeaderComponent {
  constructor(
    private userService: UserService,
    private route: Router,
    private toast: ToastrService
  ) {}

  name = sessionStorage.getItem('name');

  logout() {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('regBy');
    sessionStorage.removeItem('name');
    this.toast.success('Logout Successfully!');
    this.route.navigate(['login']);
  }

  getIdFromSessionStorage() {
    return sessionStorage.getItem('username') || '';
  }

  id = this.userService.getIdByUserLogin();
}
