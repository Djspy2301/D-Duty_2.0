import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:8000/api/v1/';

  getByCode(input: any) {
    return this.http.post(this.apiUrl + 'log-in', input);
  }

  proceedreg(inputData: any) {
    return this.http.post(this.apiUrl + '/sign-up', inputData);
  }

  updateUser(code: any, inputData: any) {
    return this.http.post(this.apiUrl + '/' + code, inputData);
  }

  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  getUserRole() {
    return sessionStorage.getItem('user') != null
      ? sessionStorage.getItem('role')?.toString()
      : '';
  }
}
