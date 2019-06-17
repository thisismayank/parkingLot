import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { products_m } from './productList/product.list.component';
import { product2_m } from './productList2/product2.list.component';
import { Product2Service } from './product2.service';
import { register } from './createProduct/create.product.component';
import { players_m } from './player.service';
import { player_m } from './movie/movie.list.component';
import { login } from './login/login.user.component';
import { users } from './user.service';
import { CarDetailsService } from './carDetails.service';
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
    products_m,
    product2_m,
    register,
    player_m,
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
    FormsModule,
    RouterModule.forRoot([
      { path: 'register', component: register },
      { path: 'list', component: player_m },
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
    Product2Service,
    players_m,
    users,
    CarDetailsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } { }