import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  constructor(private route: Router, private toast: ToastrService){}
  logout(){
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('username')
    this.toast.success('Logout Successfully!')
    this.route.navigate(['login'])

  }
}
