import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SsService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/scheduledStaff';

  proceedSeduling(input: any) {
    return this.http.post(this.apiUrl, input);
  }
}
