import { Component, ViewChild } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  id = this.adminService.id;
  // getParam() {
  //   this.route.paramMap.subscribe((param) => {
  //     this.id = param.get('id');
  //     console.log(this.id);
  //   });
  // }
  loadUsers() {
    this.adminService.getUserListByAdminId(this.id).subscribe((data: any[]) => {
      this.usersList = data;
      this.datasource = new MatTableDataSource(this.usersList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      // console.log(this.id);
    });
  }

  displayedColumns: string[] = ['user', 'name', 'email', 'deg'];
}
