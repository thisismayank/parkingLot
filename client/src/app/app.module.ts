
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { register } from './register/register.user.component';
import { login } from './login/login.user.component';

import { users } from './user.service';
import { CarDetailsService } from './carDetails.service';
import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
// import { TokenInterceptorService } from './token-interceptor.service';


import { UsersComponent } from './users/users.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ShowCarsComponent } from './show-cars/show-cars.component';
// import { FetchCarDetailsComponent } from './fetch-car-details/fetch-car-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
// import { ParkingTicketComponent } from './car-details/parking-ticket/parking-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    register,
    login,
    UsersComponent,
    CarDetailsComponent,
    ShowCarsComponent,
    // FetchCarDetailsComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    // ParkingTicketComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'register', component: register },
      { path: 'login', component: login },
      { path: 'users', component: UsersComponent },
      { path: 'parkCar', component: CarDetailsComponent },
      // { path: 'ticket', component: ParkingTicketComponent }
      { path: 'showCar', component: ShowCarsComponent },
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'userDashboard', component: UserDashboardComponent },
    ])
  ],
  providers: [
    users,
    CarDetailsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } { }