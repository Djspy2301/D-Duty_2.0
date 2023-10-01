import { Component, ViewChild } from '@angular/core';
import { SsService } from '../service/ss-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminServiceService } from '../../services/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SchedulingStaffComponent } from '../scheduling-staff/scheduling-staff.component';

@Component({
  selector: 'app-ss-popup',
  templateUrl: './ss-popup.component.html',
  styleUrls: ['./ss-popup.component.css'],
})
export class SsPopupComponent {
  constructor(
    private ssService: SsService,
    private adminService: AdminServiceService,
    private dialog: MatDialog
  ) {}
  datasource: any;
  usersList: any;
  ngOnInit(): void {
    this.displayAllotedStaff();
  }
  addSlotPopup() {
    this.dialog.open(SchedulingStaffComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '85%',
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id = this.ssService.slotValue;

  displayAllotedStaff() {
    this.ssService.getAllotedStaff().subscribe((res) => {
      console.log(res);
      this.usersList = res;
      this.datasource = new MatTableDataSource(this.usersList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['user', 'name', 'email', 'deg', 'action'];

  fetchAllotedStaff() {
    this.ssService.getAllotedStaff().subscribe((res) => {
      this.datasource = res;
    });
  }

  deleteStaff(staff: string) {
    console.log(staff);
    this.ssService.deleteAllotedStaff(staff).subscribe(() => {
      this.fetchAllotedStaff();
    });
  }
}
