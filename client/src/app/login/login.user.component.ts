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

    ngOnInit() {
        let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;

        if(token) {
            let roleOfLoggedInUser = token ? JSON.parse(token).role : null;
            if(roleOfLoggedInUser === 'ADMIN') {
                this.router.navigate(['/admin'])
            } else {
            this.router.navigate(['/userDashboard'])
            }
        }   
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
        // this.service.login(this.userCode, this.email, this.password).toPromise()
        this.authService.login(this.userCode, this.password).toPromise()
        .then((response: any)=>{
            // let data = JSON.parse(response['_body']);

            localStorage.setItem('token', response.data);
            if(this.authService.loggedIn()) {
                // this.router.navigate(['/userDashboard']);
                    this.router.navigate(['/admin']);

            }
            // if(data.success === true) {
            //     let token = {
            //         role: data.data.role,
            //         appUserId: data.data.id
            //     };

            //     localStorage.removeItem('token');
            //     localStorage.setItem('token', JSON.stringify(token));
            //     if(data.data.role === 'ADMIN') {
            //         this.router.navigate(['/admin']);
            //     } else {
            //         this.router.navigate(['/userDashboard']);
            //     }
            // } 
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
