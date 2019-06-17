
import { Component, OnInit } from '@angular/core';
// import { players_m } from './../player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { users } from '../user.service';
// import { resolve } from 'q';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  roleOfLoggedInUser: any;
  role: boolean;
  users: [];
  constructor( private service : users, private router : Router) { }

  ngOnInit() {
    this.role = false;
    let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
    let roleOfLoggedInUser = token ? JSON.parse(token).role : null;
    if(!token && roleOfLoggedInUser !== 'ADMIN') {
      this.router.navigate(['/login']);
    }
    this.getUsers();
  }

  getUsers() {
    let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
    this.roleOfLoggedInUser = token ? JSON.parse(token).role : null;
    this.role = this.roleOfLoggedInUser ? true : false;
    this.service.getUsers(this.roleOfLoggedInUser).toPromise()
    .then((response: any)=>{
      const data = JSON.parse(response['_body']).data;
      return this.users = data.map(item=>{
        let tempObj = {
          name: item.name ? item.name: null,
          email: item.email ? item.email: null,
          role: item.role ? item.role : null
        }
        return tempObj;
      });
    })
    .catch(err=> {return err;});
  }

};