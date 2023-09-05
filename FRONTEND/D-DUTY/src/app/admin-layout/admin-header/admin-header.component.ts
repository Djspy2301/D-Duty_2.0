import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  constructor(private route: Router, private toast: ToastrService) { }

  logout() {
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('username')
    this.toast.success('Logout Successfully!')
    this.route.navigate(['login'])

  }
}
