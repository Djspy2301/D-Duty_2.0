import { Component } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent {
  constructor(private adminService: AdminServiceService) {
    this.loadUsers();
  }
  // users: any;
  datasource: any;
  usersList: any;
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    // this.adminService.getAll().subscribe((res) => {
    //   this.usersList = res;
    // });
    this.adminService.getUsersByAdmin('aadi').subscribe((data: object) => {
      this.usersList = data;
      this.datasource = new MatTableDataSource(this.usersList);
    });
  }

  displayedColumns: string[] = ['id', 'name', 'email', 'deg'];
}
