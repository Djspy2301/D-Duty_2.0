import { Component, ViewChild } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SsService } from '../service/ss-service.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-scheduling-staff',
  templateUrl: './scheduling-staff.component.html',
  styleUrls: ['./scheduling-staff.component.css'],
})
export class SchedulingStaffComponent {
  constructor(
    private adminService: AdminServiceService,
    private scheduleService: SsService,
    private builder: FormBuilder
  ) {}

  id = this.adminService.id;
  datasource: any;
  usersList: any;
  ngOnInit() {
    this.loadStaff();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadStaff() {
    this.adminService.getUserListByAdminId(this.id).subscribe((data: any[]) => {
      this.usersList = data;
      this.datasource = new MatTableDataSource(this.usersList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      // console.log(this.usersList);
    });
  }
  displayedColumns: string[] = ['user', 'name', 'email', 'deg', 'select'];

  proceedStaffScheduling(user: any) {
    // console.log(user);
    this.scheduleService
      .proceedSeduling({ staffDetail: user })
      .subscribe((res) => {
        //console.log('Selected staff members added to the database:', res);
      });
  }
}
