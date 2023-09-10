import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService
  ) {
    this.route.params.subscribe((params) => {
      const logId = params['id'];
      console.log(logId);
    });
  }
  id = this.adminService.getIdFromSessionStorage();
}
