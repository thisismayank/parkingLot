import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from '../carDetails.service'
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  registrationNumber: any;
  color: any;
  makeOfCar: any;
  modelOfCar: any;

  // service: CarDetailsComponent;
  constructor( private service: CarDetailsService, private router: Router) { }

  ngOnInit() {
  }

  onSave() {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    let appUserId = token ? JSON.parse(token).appUserId: null;
    this.service.parkCar(this.registrationNumber, this.color, this.makeOfCar,  this.modelOfCar, appUserId).toPromise()
    .then(function (response: any) {
      console.log(response);
    })
  }

}
