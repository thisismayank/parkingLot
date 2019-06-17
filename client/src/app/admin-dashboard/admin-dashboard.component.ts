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
  cars: [];
  regNoColor: boolean;
  slotNoColor: boolean;
  slotNoRegNo: boolean;

  ngOnInit() {
    this.color = null;
    this.registrationNumber = null;
    this.regNoColor = false;
    this.slotNoColor = false;
    this.slotNoRegNo = false;
  }

  fetchCarsOfColor() {
    let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
    this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;

    if(this.roleOfLoggedInUser === 'ADMIN') {
        
    this.service.listCarsOfAColor(this.color, this.roleOfLoggedInUser).toPromise()
    .then((response: any)=>{
      this.regNoColor = true;
      this.cars = JSON.parse(response['_body']).data;
    });
  }
  }

showSlotsOfCarsOfColor() {

  let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
  this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;

  if(this.roleOfLoggedInUser === 'ADMIN') {
      
  this.service.listSlotsOfCarsOfAColor(this.color, this.roleOfLoggedInUser).toPromise()
  .then((response: any)=>{
    this.slotNoColor = true;
    this.cars = JSON.parse(response['_body']).data;
  });
}
}

showSlotOfCarOfRegNo() {
  let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
  this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;

  if(this.roleOfLoggedInUser === 'ADMIN') {
      
  this.service.listSlotOfCar(this.registrationNumber, this.roleOfLoggedInUser).toPromise()
  .then((response: any)=>{
    this.slotNoRegNo = true;
    this.cars = JSON.parse(response['_body']).data;
  });
}
}
getUsers() {
  return this.router.navigate(['/users']);
}
}
