import { Component, ViewChild } from '@angular/core';
import { AdminServiceService } from '../services/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { TimeService } from './time.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CtsPopupComponent } from './cts-popup/cts-popup.component';

@Component({
  selector: 'app-time-schedule',
  templateUrl: './time-schedule.component.html',
  styleUrls: ['./time-schedule.component.css'],
  providers: [DatePipe],
})
export class TimeScheduleComponent {
  constructor(
    private adminService: AdminServiceService,
    private timeService: TimeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadSlot();
  }

  id = this.adminService.id;
  datasource: any;
  usersList: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  addSlotPopup() {
    this.dialog.open(CtsPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
    });
  }

  loadSlot() {
    this.timeService.getTimeSlotByAdmin(this.id).subscribe((data: any[]) => {
      this.usersList = data;
      this.datasource = new MatTableDataSource(this.usersList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      // console.log(this.usersList);
    });
  }
  displayedColumns: string[] = ['date', 'time', 'action'];

  formatTime(timeString: string): string {
    // Parse the time string into a Date object
    const time = new Date(`2000-01-01T${timeString}:00`);

    // Format the Date object as HH:mm AM/PM
    const formattedTime = time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return formattedTime;
  }

  fetchDatetimeData() {
    this.timeService.getTimeSlotByAdmin(this.id).subscribe((data: any[]) => {
      this.datasource = data;
    });
  }

  deleteSlot(slotId: string) {
    // Call the deleteSlot method from your service
    this.timeService.deleteSlot(slotId).subscribe(() => {
      // After successful deletion, update the data in your component
      this.fetchDatetimeData();
    });
  }
}
