import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CarDetailsService } from '../carDetails.service';
import { users } from '../user.service';
// import { Router } from '@angular/Router';

@Component({
  selector: 'app-show-cars',
  templateUrl: './show-cars.component.html',
  styleUrls: ['./show-cars.component.css']
})
export class ShowCarsComponent implements OnInit {

  appUserId: any;
  roleOfLoggedInUser: any;
  cars: any;
  token: any;
  error: any;
  constructor(private service: CarDetailsService, private userService: users,private router: Router) { }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('token'));
    // if(!token) {
    //   this.router.navigate(['/login']);
    // }

    this.userService.authorizeCustomer(this.token).toPromise()
            .then((response:any)=>{
                if(JSON.parse(response['_body']) === false) {
                    this.error = 'Un-authorized'
                    this.router.navigate(['/login']);
                }
            });

    // if(!this.userService.authorizeCustomer(this.token)) {
    //   this.error = 'Un-authorized'
    //   this.router.navigate(['/login']);
    // }
    this.showCars();
  }

  showCars() {
    // this.appUserId = token ? JSON.parse(token).appUserId : null;
    // this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;

    // if(this.roleOfLoggedInUser !== 'ADMIN') {
        // this.service.listCars(this.appUserId).toPromise()

        this.service.listCars(this.token).toPromise()
        .then((response:any)=>{
          this.cars = JSON.parse(response['_body']).data;
        })
    // }
};

onUnpark() {
  return this.router.navigate(['/parkCar'])
}

goBack() {
  return this.router.navigate(['/userDashboard']);
}
}
