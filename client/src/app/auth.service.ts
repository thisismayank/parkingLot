import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

    baseUrl = 'http://localhost:3000/api';

    public login(userCode, password) {
      const query = `/appUsers/login`;

      
      const data = {
        userCode: userCode.toString(),
        password: password.toString()
    };
    // let body = JSON.stringify(data)
      return this.http.post(this.baseUrl + query, data);
    }

    public loggedIn() {
      return !!localStorage.getItem('token');
    }

    public getToken() {
      return localStorage.getItem('token');
    }
}
