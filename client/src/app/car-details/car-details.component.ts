import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from '../carDetails.service'
import { users } from '../user.service';
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
  slotNumber: any;
  floorNumber: any;
  parkingTime: any;
  unparkingTime: any;
  parkingTicket: any;
  appUserId: any;

  park: boolean;
  unpark: boolean;
  selected: boolean;
  details: boolean;
  token: any;
  error: any;
  // service: CarDetailsComponent;
  constructor( private service: CarDetailsService, private userService: users,private router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if(!this.userService.authorizeCustomer(this.token)) {
      this.error = 'Un-authorized'
      this.router.navigate(['/login']);
    }
    this.details = false;
    this.park = false;
    this.unpark = false;
    this.selected = false;
    this.parkingTicket;
  }

  onPark() {
    this.park = true;
    this.selected = true;
    this.unpark = false;
  }

  onUnpark() {
   this.unpark = true;
   this.selected = true;
   this.park = false; 
  }

  onParkCar() {

    this.service.parkCar(this.registrationNumber, this.color, this.makeOfCar,  this.modelOfCar, this.token).toPromise()
    .then((response: any) => {
      let data = response ? JSON.parse(response['_body']) : null;
      if(data && data.success === true) {
      this.details = true;
      this.park = true;
      this.unpark = false;
      this.selected = true;
      this.registrationNumber = data.data.registrationNumber;
      this.color = data.data.color;
      this.modelOfCar = data.data.modelOfCar;
      this.slotNumber = data.data.slotNumber;
      this.floorNumber = data.data.floorNumber;
      this.parkingTime = data.data.parkingTime; 
      }
    });
  }

  onUnparkCar() {
    return this.service.unparkCar(this.registrationNumber, this.token).toPromise()
    .then((response: any)=>{
      let data = response ? JSON.parse(response['_body']) : null;
      if(data && data.success === true) {
      this.details = true;
      this.park = false;
      this.unpark = true;
      this.selected = true;

      this.registrationNumber = data.data.registrationNumber;
      this.slotNumber = data.data.slotNumber;
      this.floorNumber = data.data.floorNumber;
      this.parkingTime = data.data.parkingTime;
      this.unparkingTime = data.data.unparkingTime;
      }
    })
}

goBack() {
  this.details = false;
  this.park = false;
  this.unpark = false;
  this.selected = false;
}

goBackToDashBoard() {
  return this.router.navigate(['/login']);
}
}





