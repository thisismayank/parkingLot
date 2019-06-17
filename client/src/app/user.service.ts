import { players_m } from './player.service';
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

    public getUsers(roleOfLoggedInUser)
    {
        const query = `/appUsers/fetchAllUsers?roleOfLoggedInUser=${roleOfLoggedInUser}`;
        return this.http.get(this.baseUrl + query);
    }

    public login(userCode, email, password)
    {
        const query1 = `?userCode=${userCode}&password=${password}`;
        const query = `/appUsers/login`;
        const data = {
            userCode: userCode,
            password: password
        }
        console.log(this.baseUrl + query);
        return this.http.post(this.baseUrl + query + query1, '');
    }

    public register(firstName, lastName, userCode, email, password, dob, gender, role, roleOfLoggedInUser)
    {
        const path = `/appUsers/register`;
        const query = `?firstName=${firstName}&lastName=${lastName}&userCode=${userCode}&email=${email}&password=${password}&dob=${dob}&gender=${gender}&role=${role}&roleOfLoggedInUser=${roleOfLoggedInUser}`;
        return this.http.post(this.baseUrl + path + query, '');
    }

    public disableUser(userCode, email, roleOfLoggedInUser) {
        const path = '/appUsers/disableuser';
        const query = `?userCode=${userCode}&email=${email}&roleOfLoggedInUser=${roleOfLoggedInUser}`;
        return this.http.post(this.baseUrl + path + query, '');
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