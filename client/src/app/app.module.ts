import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { products_m } from './productList/product.list.component';
import { product2_m } from './productList2/product2.list.component';
import { Product2Service } from './product2.service';
import { createProduct_m } from './createProduct/create.product.component';
import { players_m } from './player.service';
import { player_m } from './movie/movie.list.component';

@NgModule({
  declarations: [
    AppComponent,
    products_m,
    product2_m,
    createProduct_m,
    player_m
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'update', component: createProduct_m },
      { path: 'list', component: player_m }
    ])
  ],
  providers: [
    Product2Service,
    players_m
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
