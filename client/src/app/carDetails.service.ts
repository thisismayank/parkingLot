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

  public listCars(appUserId) {
    const path = '/parkingDetails/fetchcars';
    const query = `?appUserId=${appUserId}`;
    return this.http.post(this.baseUrl + path + query, '');
  }

  public listCarsOfAColor(color, roleOfLoggedInUser) {
    const path = '/carDetails/fetchallcarsofaparticularcolor';
    const query = `?color=${color}&roleOfLoggedInUser=${roleOfLoggedInUser}`;
    return this.http.post(this.baseUrl + path + query, '');
  }
  
  public listSlotOfCar(registrationNumber, roleOfLoggedInUser) {
    const path = '/carDetails/fetchSlotNumber';
    const query = `?registrationNumber=${registrationNumber}&roleOfLoggedInUser=${roleOfLoggedInUser}`;
    return this.http.post(this.baseUrl + path + query, '');
  }

  public listSlotsOfCarsOfAColor(color, roleOfLoggedInUser) {
    const path = '/carDetails/fetchslotnumbersofcolor';
    const query = `?color=${color}&roleOfLoggedInUser=${roleOfLoggedInUser}`;
    return this.http.post(this.baseUrl + path + query, '');
  }
}
