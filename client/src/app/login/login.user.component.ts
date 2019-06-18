import { CarDetailsService } from './../carDetails.service';
import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { users } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
    selector : 'login-mak',
    templateUrl : './login.user.component.html',
    styleUrls : ['./login.user.component.css']
})

export class login implements OnInit
{
    service : users;

    token: any;
    ngOnInit() {
        this.token = JSON.parse(localStorage.getItem('token'));   
    }
    constructor( service: users, private authService: AuthService, private router: Router, private route : ActivatedRoute )
    {
        this.service = service;
    }

    userCode = '';
    email = '';
    password = '';

    error = '';
    timer = 0;
    message = '';
    roleOfLoggedInUser: any;
    role: any;
    appUserId: any;
    registrationNumber: any;

    onSave()
    {
        this.service.login(this.userCode, this.password).toPromise()
        // this.authService.login(this.userCode, this.password).toPromise()
        .then((response: any)=>{
            let data = JSON.parse(response['_body']).data;
            localStorage.removeItem('token');
            localStorage.setItem('token', JSON.stringify(data));
            // if(this.authService.loggedIn()) {
            //     // this.router.navigate(['/userDashboard']);
            //         this.router.navigate(['/admin']);

            // }
            // if(data.success === true) {
            //     let token = {
            //         role: data.data.role,
            //         appUserId: data.data.id
            //     };

            //     localStorage.removeItem('token');
            //     localStorage.setItem('token', JSON.stringify(token));
            this.service.authorizeAdmin(data).toPromise()
            .then((response:any)=>{
                if(JSON.parse(response['_body']) === true) {
                    this.router.navigate(['/admin']);
                }
            });
            this.service.authorizeCustomer(data).toPromise()
            .then((response:any)=>{
                if(JSON.parse(response['_body']) == true) {
                    this.router.navigate(['/userDashboard']);
                }
            });
        });
    }

    onCancel()
    {
        this.userCode = '';
        this.email = '';
        this.password = '' ;
        this.router.navigate(['/login']);
    }

};
