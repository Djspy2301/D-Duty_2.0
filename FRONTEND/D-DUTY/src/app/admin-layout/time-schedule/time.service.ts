import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor(private http: HttpClient, private route: Router) {}
  apiUrl = 'http://localhost:3000/dateTime';
  addSlot(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }

  getTimeSlotByAdmin(adminId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?regBy=${adminId}`);
  }

  deleteSlot(slotId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slotId}`);
  }
}
