import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/user';

  getAll() {
    return this.http.get(this.apiUrl);
  }
  addStaff(inputData: any) {
    return this.http.post(this.apiUrl, inputData);
  }
  id = this.getIdFromSessionStorage();
  getIdFromSessionStorage() {
    return sessionStorage.getItem('username') || '';
  }
  //fetch userlist
  getUsersByAdmin(adminId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?regBy=${adminId}`);
  }

  pageReload() {
    window.location.reload();
  }
}
