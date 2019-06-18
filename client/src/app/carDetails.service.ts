import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarDetailsService {

  baseUrl = 'http://localhost:3000/api';

  constructor( private http: Http) { }

  // car-details
  public parkCar(registrationNumber, color, makeOfCar, modelOfCar, token) {
    const path = '/carDetails/registercar';
    const body = {
      registerationNumber: registrationNumber.toString(),
      color: color.toString(),
      makeOfCar: makeOfCar.toString(),
      modelOfCar: modelOfCar.toString(),
      token: token.toString()
    }
    return this.http.post(this.baseUrl + path, body);
  }

  public parkedNearBy(registrationNumber, token) {
    const path = '/carDetails/carsparkedby';
    const body = {
      registerationNumber: registrationNumber.toString(),
      token: token.toString()
    }
    return this.http.post(this.baseUrl + path, body);
  } 
  
  public listCarsOfAColor(color, token) {
    const path = '/carDetails/fetchallcarsofaparticularcolor';

    const body = {
      color: color.toString(),
      token: token.toString()
    }
    return this.http.post(this.baseUrl + path, body);
  }
  
  public listSlotOfCar(registrationNumber, token) {
    const path = '/carDetails/fetchslotnumber';
    const body = {
      registerationNumber: registrationNumber.toString(),
      token: token.toString()
    }
    return this.http.post(this.baseUrl + path, body);
  }

  public listSlotsOfCarsOfAColor(color, token) {
    const path = '/carDetails/fetchslotnumbersofcolor';

    const body = {
      color: color.toString(),
      token: token.toString()
    }
    return this.http.post(this.baseUrl + path, body);
  }

  public unparkCar(registrationNumber, token) {
    const path = '/carDetails/unparkcar';
    const body = {
      registerationNumber: registrationNumber.toString(),
      token: token.toString()
    }
    return this.http.post(this.baseUrl + path, body);
  }

  // floor-details
  public parkingGrid() {
    const path = '/floorDetails/stateofparkingspace';
    return this.http.get(this.baseUrl + path, '');
  }

  // parking-details
  public listCars(token) {
    const path = '/parkingDetails/fetchcars';
    const body = {
      token: token.toString()
    }
    return this.http.post(this.baseUrl + path, body);
  }


}
