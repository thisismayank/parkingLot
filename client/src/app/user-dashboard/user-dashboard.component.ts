import { CarDetailsService } from './../carDetails.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { users } from '../user.service';
// import { users } from '../user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor(private service: CarDetailsService, private userService: users, private router: Router) { }

  roleOfLoggedInUser: any;
  parkedNearBy: boolean;
  registrationNumber: any;
  cars: any;
  token: any;
  error: any;

  ngOnInit() {
    this.token =JSON.parse(localStorage.getItem('token'));
    console.log('token in user-dashboard', this.token);
    this.userService.authorizeCustomer(this.token).toPromise()
            .then((response:any)=>{
              console.log(response);
                if(JSON.parse(response['_body']) === false) {
                    this.error = 'Un-authorized'
                    this.router.navigate(['/login']);
                }
            });

    // let roleOfLoggedInUser = token ? JSON.parse(token).role : null;
    // if(!token && roleOfLoggedInUser === 'ADMIN') {
    //   this.router.navigate(['/login']);
    // }
    this.parkedNearBy = false;
  }

  parkUnparkCar()
  {
   return this.router.navigate(['/parkCar']);
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
    this.service.parkedNearBy(this.registrationNumber, this.token).toPromise()
    .then((response: any) =>{
      this.cars = response ? JSON.parse(response['_body']).data: null;
    })
  }
}
