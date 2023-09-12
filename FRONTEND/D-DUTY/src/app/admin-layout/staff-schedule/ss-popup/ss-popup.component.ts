import { Component, ViewChild } from '@angular/core';
import { SsService } from '../service/ss-service.service';
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

  addSlotPopup() {
    this.dialog.open(SchedulingStaffComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '85%',
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id = this.adminService.id;

  displayedColumns: string[] = ['id', 'name', 'email', 'deg'];
}
