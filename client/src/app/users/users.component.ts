
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
  token: any;
  constructor( private service : users, private router : Router) { }

  ngOnInit() {
    this.role = false;
    this.token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
    
    this.getUsers();
  }

  getUsers() {
    this.role = this.roleOfLoggedInUser ? true : false;
    this.service.getUsers(this.token).toPromise()
    .then((response: any)=>{
      const data = JSON.parse(response['_body']).data;
      return this.users = data.map(item=>{
        let tempObj = {
          name: item.name ? item.name: null,
          email: item.email ? item.email: null,
          userCode: item.userCode ? item.userCode: null,
          role: item.role ? item.role : null
        }
        return tempObj;
      });
    })
    .catch(err=> {return err;});
  }

};