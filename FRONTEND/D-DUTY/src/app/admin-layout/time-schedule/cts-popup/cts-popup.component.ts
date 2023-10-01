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
    inTime: this.builder.control('', Validators.required),
    outTime: this.builder.control('', Validators.required),
    regBy: '',
  });
  logId = sessionStorage.getItem('user');
  proceedSlot() {
    const dateValue = this.addSlot.value['date'] as string;
    const dateObject = new Date(dateValue);
    const formatDate = this.timeService.formatDate(dateObject);
    this.addSlot.value['date'] = formatDate;
    this.addSlot.value['regBy'] = sessionStorage.getItem('user');
    console.log(this.addSlot);

    if (this.addSlot.valid) {
      this.timeService
        .addSlot(this.logId, this.addSlot.value)
        .subscribe((res) => {
          this.toast.success('Time&Date slot added Successful!');
          this.route.navigate(['admin', this.logId, 'time-schedule']);
          this.addSlot.reset();
        });
    } else {
      this.toast.warning('Pleas enter valid inputs!');
    }
  }
}
