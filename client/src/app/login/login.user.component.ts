import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { users } from '../user.service';

@Component({
    selector : 'login-mak',
    templateUrl : './login.user.component.html',
    styleUrls : ['./login.user.component.css']
})

export class login
{
    service : users;

    constructor( service: users, private router: Router, private route : ActivatedRoute )
    {
        this.service = service;
    }

    userCode = '';
    email = '';
    password = '';

    errorStatus = false;
    error = '';
    timer = 0;
    message = '';

    onSave()
    {
        this.service.login(this.userCode, this.email, this.password).toPromise()
        .then((response: any)=>{
            let data = JSON.parse(response['_body']);

            if(data.success === true) {
                let token = {
                    role: data.data.role,
                    appUserId: data.data.id
                };

                localStorage.removeItem('token');
                localStorage.setItem('token', JSON.stringify(token));
                if(data.data.role === 'ADMIN') {
                    this.router.navigate(['/users']);
                } else {
                    this.router.navigate(['/parkCar']);
                }
            } 
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