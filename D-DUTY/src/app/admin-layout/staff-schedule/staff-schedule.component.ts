import { Component } from '@angular/core';

import { AdminServiceService } from '../services/admin-service.service';
import { SsService } from './service/ss-service.service';
import { SsPopupComponent } from './ss-popup/ss-popup.component';

@Component({
  selector: 'app-staff-schedule',
  templateUrl: './staff-schedule.component.html',
  styleUrls: ['./staff-schedule.component.css'],
})
export class StaffScheduleComponent {
  timeSlots: any[] = [];

  constructor(
    private ssService: SsService,
    private adminService: AdminServiceService
  ) {}
  id = this.adminService.id;
  ngOnInit(): void {
    this.loadTimeSlots();
  }

  loadTimeSlots() {
    this.ssService.getTimeSlots(this.id).subscribe((data: any[]) => {
      this.timeSlots = data;
    });
  }

  ssPopUp(slot: string) {
    this.ssService.viewSsPopup(slot);
  }
}
