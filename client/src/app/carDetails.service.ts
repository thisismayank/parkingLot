import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {

  baseUrl = 'http://localhost:3000/api';

  constructor( private http: Http) { }

  public parkCar(registrationNumber, color, makeOfCar, modelOfCar, appUserId) {
    const path = '/carDetails/registercar';
    const query = `?registrationNo=${registrationNumber}&color=${color}&makeOfCar=${makeOfCar}&modelOfCar=${modelOfCar}&appUserId=${appUserId}`;
    return this.http.post(this.baseUrl + path + query, '');
  }

}
