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
                localStorage.setItem('role', data.data.role);
                this.router.navigate(['/users']);
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