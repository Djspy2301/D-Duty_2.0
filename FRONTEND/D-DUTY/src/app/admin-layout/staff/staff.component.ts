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
  datasource: any;
  usersList: any;

  loadUsers() {
    this.adminService.getAll().subscribe((res) => {
      this.usersList = res;
      this.datasource = new MatTableDataSource(this.usersList);
    });
  }

  displayedColumns: string[] = ['id', 'name', 'email', 'deg'];
}
