import { Component } from '@angular/core';
import { StaffScheduleService } from './staff-schedule.service';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-staff-schedule',
  templateUrl: './staff-schedule.component.html',
  styleUrls: ['./staff-schedule.component.css'],
})
export class StaffScheduleComponent {
  timeSlots: any[] = [];

  constructor(
    private staffScheduleService: StaffScheduleService,
    private adminService: AdminServiceService
  ) {}
  id = this.adminService.id;
  ngOnInit(): void {
    this.loadTimeSlots();
  }

  loadTimeSlots() {
    this.staffScheduleService.getTimeSlots(this.id).subscribe((data) => {
      this.timeSlots = data;
      console.log(data);
    });
  }
}
