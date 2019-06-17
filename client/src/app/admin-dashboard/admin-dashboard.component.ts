import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from '../carDetails.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private service: CarDetailsService, private router: Router) { }

  color: any;
  registrationNumber: any;
  roleOfLoggedInUser: any;
  appUserId: any;
  parkingTime: any;
  slotNumber: any;
  floorNumber: any;
  cars: [];
  regNoColor: boolean;
  slotNoColor: boolean;
  slotNoRegNo: boolean;
  grid: boolean;

  ngOnInit() {
    let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
    this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;
    if(this.roleOfLoggedInUser !== 'ADMIN') {
      this.router.navigate(['/login']);
    }
    this.color = null;
    this.registrationNumber = null;
    this.regNoColor = false;
    this.slotNoColor = false;
    this.slotNoRegNo = false;
    this.grid = false;
  }

  fetchCarsOfColor() {
    if(this.color){
    let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
    this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;

    if(this.roleOfLoggedInUser === 'ADMIN') {
        
    this.service.listCarsOfAColor(this.color, this.roleOfLoggedInUser).toPromise()
    .then((response: any)=>{
      this.regNoColor = true;
    this.slotNoColor = false;
    this.slotNoRegNo = false;
    this.grid = false;
      this.cars = JSON.parse(response['_body']).data;
    });
  }
}
  }

showSlotsOfCarsOfColor() {

  if(this.color){
  let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
  this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;

  if(this.roleOfLoggedInUser === 'ADMIN') {
      
  this.service.listSlotsOfCarsOfAColor(this.color, this.roleOfLoggedInUser).toPromise()
  .then((response: any)=>{
    this.slotNoColor = true;
    this.regNoColor = false;
    this.slotNoRegNo = false;
    this.grid = false; 
    this.cars = JSON.parse(response['_body']).data;
  });
}
  }
}

showSlotOfCarOfRegNo() {
  if(this.registrationNumber){
  let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
  this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;

  if(this.roleOfLoggedInUser === 'ADMIN') {
      
  this.service.listSlotOfCar(this.registrationNumber, this.roleOfLoggedInUser).toPromise()
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
}

logout() {
  localStorage.removeItem('token');
  return this.router.navigate(['/login']);
}
}
