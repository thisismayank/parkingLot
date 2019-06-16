import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from '../carDetails.service'
@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  details: boolean;
  registrationNumber: any;
  color: any;
  makeOfCar: any;
  modelOfCar: any;
  slotNumber: any;
  floorNumber: any;
  parkingTime: any;
  parkingTicket: any;
  // service: CarDetailsComponent;
  constructor( private service: CarDetailsService, private router: Router) { }

  ngOnInit() {
    this.details = false;
    this.parkingTicket;
  }

  onSave() {
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
    let appUserId = token ? JSON.parse(token).appUserId: null;
    this.service.parkCar(this.registrationNumber, this.color, this.makeOfCar,  this.modelOfCar, appUserId).toPromise()
    .then((response: any) => {
      let data = response ? JSON.parse(response['_body']) : null;
      if(data && data.success === true) {
      this.details = true;
      this.registrationNumber = data.data.registrationNo;
      this.color = data.data.color;
      this.modelOfCar = data.data.modelOfCar;
      this.slotNumber = data.data.slotNumber;
      this.floorNumber = data.data.floorNumber;
      this.parkingTime = data.data.parkingTime;
      
      }
    });
  }

}




