import { CarDetailsService } from './../carDetails.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { users } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private service: CarDetailsService, private router: Router) { }

  roleOfLoggedInUser: any;
  parkedNearBy: boolean;
  registrationNumber: any;
  cars: any;

  ngOnInit() {
    let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
    let roleOfLoggedInUser = token ? JSON.parse(token).role : null;
    if(!token && roleOfLoggedInUser === 'ADMIN') {
      this.router.navigate(['/login']);
    }
    this.parkedNearBy = false;
  }

  parkUnparkCar()
  {
      let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
      this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;
      if(this.roleOfLoggedInUser !== 'ADMIN') {
          return this.router.navigate(['/parkCar']);
      }
  };

  showCars() {
          return this.router.navigate(['/showCar']);
  };

  logout() {
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }

  carsParkedNearBy() {
    this.parkedNearBy = true;
    this.service.parkedNearBy(this.registrationNumber).toPromise()
    .then((response: any) =>{
      this.cars = response ? JSON.parse(response['_body']).data: null;
    })
  }
}
