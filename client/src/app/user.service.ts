import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class users
{
    baseUrl = 'http://localhost:3000/api';
    getUrl = 'http://localhost:3000/api/app-users'
    http : Http;

    constructor( http : Http )
    {
        this.http = http;
    }

    public getUsers(token)
    {
        const path = `/appUsers/fetchAllUsers`;
        const body = {
            token: token.toString()
        };
        return this.http.post(this.baseUrl + path, body);
    }

    public login(userCode, password)
    {
        const path = `/appUsers/login`;
        const body = {
            userCode: userCode.toString(),
            password: password.toString()
        };
        return this.http.post(this.baseUrl + path, body);
    }

    public register(firstName, lastName, userCode, email, password, dob, gender, role, token)
    {
        const path = `/appUsers/register`;
        const body = {
            firstName: firstName.toString(),
            lastName: lastName.toString(),
            userCode: userCode.toString(),
            email: email.toString(),
            password: password.toString(),
            dob: dob.toString(),
            gender: gender.toString(),
            role: role.toString(),
            roleOfLoggedInUser: token.toString()
        }
        
        return this.http.post(this.baseUrl + path, body);
    }

    public disableUser(userCode, email, token) {
        const path = '/appUsers/disableuser';
        const body = {
            userCode: userCode.toString(),
            email: email.toString(),
            token: token.toString()
        }
        return this.http.post(this.baseUrl + path, body);
    }

    public authorizeCustomer(token) {
        const path = '/appUsers/authorizeCustomer';
        const body = {
            token: token.toString()
        }
        // return this.http.post(this.baseUrl + path, body);
        return this.http.post(this.baseUrl + path, body);
        // .then((response: any)=>{
        //     let data = JSON.parse(response['_body']).data;
        //     return true;
        // })
    }

    public authorizeAdmin(token) {
        const path = '/appUsers/authorizeAdmin';
        const body = {
            token: token.toString()
        }
        return this.http.post(this.baseUrl + path, body);
        // .then((response: any)=>{
        //     let data = JSON.parse(response['_body']).data;
        //     return true;
        // })
    }
    // public deletePlayer(id)
    // {
    //     return this.http.delete(this.baseUrl + '/' + id);
    // }

    // public getById(id)
    // {
    //     return this.http.get(this.baseUrl + '/' + id);
    // }
}