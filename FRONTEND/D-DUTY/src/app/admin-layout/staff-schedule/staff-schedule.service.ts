import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffScheduleService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/api/v1/';
  getTimeSlots(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}admin/${id}/load-slots`);
  }
}
