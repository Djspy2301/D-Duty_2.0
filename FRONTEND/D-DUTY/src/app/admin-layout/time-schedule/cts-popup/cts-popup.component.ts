import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TimeService } from '../time.service';

@Component({
  selector: 'app-cts-popup',
  templateUrl: './cts-popup.component.html',
  styleUrls: ['./cts-popup.component.css'],
})
export class CtsPopupComponent {
  constructor(
    private builder: FormBuilder,
    private toast: ToastrService,
    private timeService: TimeService,
    private route: Router
  ) {}
  addSlot = this.builder.group({
    date: this.builder.control('', Validators.required),
    time: this.builder.control('', Validators.required),
    regBy: this.builder.control(sessionStorage.getItem('username')),
  });
  logId = sessionStorage.getItem('username');
  proceedSlot() {
    if (this.addSlot.valid) {
      this.timeService.addSlot(this.addSlot.value).subscribe((res) => {
        this.toast.success('Time&Date slot added Successful!');
        this.route.navigate(['admin', this.logId, 'time-schedule']);
        this.addSlot.reset();
      });
    } else {
      this.toast.warning('Pleas enter valid inputs!');
    }
  }
}
