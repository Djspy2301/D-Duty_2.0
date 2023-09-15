import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  constructor(private http: HttpClient, private route: Router) {}
  apiUrl = 'http://localhost:8000/api/v1/';
  addSlot(id: any, inputData: any) {
    return this.http.post(`${this.apiUrl}admin/${id}/schedule-time`, inputData);
  }

  getTimeSlotByAdmin(adminId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}admin/${adminId}/load-list`);
  }

  deleteSlot(slotId: string) {
    return this.http.delete(`${this.apiUrl}admin/delete-slot/${slotId}`);
  }

  formatDate(date: Date): string {
    // Format the Date object as a string in the desired format
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
  }
}
