import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private route: Router) {}
  private apiUrl = 'http://localhost:8000/api/v1/';

  getIdByUserLogin() {
    return sessionStorage.getItem('user') || '';
  }

  getIdByUser(user: any) {
    return this.http.get(`${this.apiUrl}${user}/get-id`);
  }
  getDutyById(userId: any) {
    return this.http.get(`${this.apiUrl}user/${userId}/load-duty`);
  }
}
