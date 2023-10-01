import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsPopupComponent } from '../ss-popup/ss-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class SsService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  public slotValue: string = '';
  apiUrl = 'http://localhost:8000/api/v1/';

  proceedSeduling(input: any) {
    return this.http.put(
      `${this.apiUrl}admin/${this.slotValue}/add-to-slot`,
      input
    );
  }
  getAllotedStaff() {
    return this.http.get(
      `${this.apiUrl}admin/${this.slotValue}/load-sheduled-staff`
    );
  }

  deleteAllotedStaff(input: any) {
    return this.http.delete(
      `${this.apiUrl}admin/${this.slotValue}/delete-sheduled-staff/${input}`
    );
  }
  viewSsPopup(slot: string) {
    this.slotValue = slot;
    console.log('slotValue:', this.slotValue);
    this.dialog.open(SsPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '70%',
      height: '70%',
    });
  }
}
