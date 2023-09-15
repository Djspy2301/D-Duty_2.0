import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:8000/api/v1/';

  getAll() {
    return this.http.get(this.apiUrl);
  }
  addStaff(id: any, inputData: any) {
    return this.http.post(this.apiUrl + `${id}` + '/add-staff', inputData);
  }
  id = this.getIdFromSessionStorage();
  getIdFromSessionStorage() {
    return sessionStorage.getItem('user') || '';
  }
  //fetch userlist
  getUserListByAdminId(adminId: string): Observable<any[]> {
    const url = `${this.apiUrl}/admin/${adminId}/staff`;
    return this.http.get<any[]>(url);
  }

  pageReload() {
    window.location.reload();
  }
}
