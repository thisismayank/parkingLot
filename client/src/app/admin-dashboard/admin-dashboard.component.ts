import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from '../carDetails.service';
import { users } from '../user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private service: CarDetailsService, private userService: users, private router: Router) { }

  color: any;
  registrationNumber: any;
  roleOfLoggedInUser: any;
  appUserId: any;
  parkingTime: any;
  slotNumber: any;
  floorNumber: any;
  cars: [];
  userCode: any;
  email: any;

  regNoColor: boolean;
  slotNoColor: boolean;
  slotNoRegNo: boolean;
  grid: boolean;
  disableUser: boolean;

  error: any;
  token: any;
  ngOnInit() {
    this.token = localStorage.getItem('token');
    if(!this.userService.authorizeAdmin(this.token)) {
      this.error = 'Un-authorized'
      this.router.navigate(['/login']);
    }
    this.color = null;
    this.registrationNumber = null;
    this.regNoColor = false;
    this.slotNoColor = false;
    this.slotNoRegNo = false;
    this.grid = false;
    this.disableUser = false;
  }

  fetchCarsOfColor() {
    if(this.color){
 
    this.service.listCarsOfAColor(this.color, this.token).toPromise()
    .then((response: any)=>{
      this.regNoColor = true;
      this.slotNoColor = false;
      this.slotNoRegNo = false;
      this.grid = false;
      this.cars = JSON.parse(response['_body']).data;
    });
}
  }

showSlotsOfCarsOfColor() {

  if(this.color){

  this.service.listSlotsOfCarsOfAColor(this.color, this.token).toPromise()
  .then((response: any)=>{
    this.slotNoColor = true;
    this.regNoColor = false;
    this.slotNoRegNo = false;
    this.grid = false; 
    this.cars = JSON.parse(response['_body']).data;
  });
  }
}

showSlotOfCarOfRegNo() {
  if(this.registrationNumber){
      
  this.service.listSlotOfCar(this.registrationNumber, this.token).toPromise()
  .then((response: any)=>{
    this.slotNoRegNo = true;
    this.regNoColor = false;
    this.slotNoColor = false;
    this.grid = false;
    let data = JSON.parse(response['_body']).data;
    this.registrationNumber = data.registrationNumber;
    this.parkingTime = data.parkingTime;
    this.slotNumber = data.slotNumber;
    this.floorNumber = data.floorNumber;
  });
  }
}
getUsers() {
  return this.router.navigate(['/users']);
}

showGrid() {
  return this.service.parkingGrid().toPromise()
  .then((response: any)=>{
    this.cars = JSON.parse(response['_body']).data; 
    this.regNoColor = false;
    this.slotNoColor = false;
    this.slotNoRegNo = false; 
    this.grid = true;
  })
}
goBack() {
  this.regNoColor = false;
  this.slotNoColor = false;
  this.slotNoRegNo = false; 
  this.grid = false;
  this.disableUser = false;
}

logout() {
  localStorage.removeItem('token');
  return this.router.navigate(['/login']);
}

disable() {
  this.disableUser = true;
}

disableUsers() {
  
  this.userService.disableUser(this.userCode, this.email, this.token).toPromise()
  .then((response: any)=>{
    let status = JSON.parse(response['_body']);
    if(status.success === true) {
      this.router.navigate(['/users']);
    }; 

  })
}
}
