import { Component } from '@angular/core';
import { StaffScheduleService } from './staff-schedule.service';
import { AdminServiceService } from '../services/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SsPopupComponent } from './ss-popup/ss-popup.component';
import { SsService } from './service/ss-service.service';

@Component({
  selector: 'app-staff-schedule',
  templateUrl: './staff-schedule.component.html',
  styleUrls: ['./staff-schedule.component.css'],
})
export class StaffScheduleComponent {
  timeSlots: any[] = [];

  constructor(
    private staffScheduleService: StaffScheduleService,
    private ssService: SsService,
    private adminService: AdminServiceService
  ) {}
  id = this.adminService.id;
  ngOnInit(): void {
    this.loadTimeSlots();
  }

  loadTimeSlots() {
    this.staffScheduleService.getTimeSlots(this.id).subscribe((data: any[]) => {
      this.timeSlots = data;
    });
  }

  ssPopUp(slot: string) {
    this.ssService.viewSsPopup(slot);
  }
}
