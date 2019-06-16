import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { players_m } from './../player.service';
import { users } from '../user.service';

@Component({
    selector : 'create-mak',
    templateUrl : './create.product.component.html',
    styleUrls : ['./create.product.component.css']
})

export class createProduct_m
{
    firstName: any;
    lastName: any;
    userCode: any;
    email: any;
    password: any;
    dob: any;
    gender: any;
    role: any;

    constructor( private service: users, private router: Router, private route : ActivatedRoute )
    {

        // route.queryParams.subscribe((params)=>{
            
        //     console.log(params);
        //     var id = params.id;
        //     this.service.getById(id).subscribe((response)=>{
        //         debugger;
        //         var result = response.json();
        //         var player = result.result;

        //         this.name = player[0].name;
        //         this.club = player[0].club;
        //         this.rating = player[0].rating;
        //         this.description = player[0].description;
        //     });
        // });

    }

    // name = '';
    // club = '';
    // rating = 0;
    // description = '';
    // image : any;

    // onSelectedFile(event)
    // {
    //     this.image = event.target.files[0];
    // }

    onSave()
    {
        // this.service.postPlayers(this.name, this.club, this.rating, this.description, this.image).subscribe((response)=>{
        //     console.log(response);
        // });
        // this.router.navigate(['/list']);
        let token = localStorage.getItem('token') ? localStorage.getItem('token'): null;
        let roleOfLoggedInUser = token ? JSON.parse(token).role: null;
        if(roleOfLoggedInUser) {
        this.service.register(this.firstName, this.lastName, this.userCode, this.email, this.password, this.dob,this.gender,this.role, roleOfLoggedInUser).toPromise()
        .then((response: any)=>{
            let data = JSON.parse(response['_body']);
            if(data.success === true) {
                this.router.navigate(['/login']);
            }
        });
    }
    }

    onCancel()
    {
        this.firstName = '';
        this.lastName = '';
        this.userCode = '' ;
        this.email = '';
        this.password = '';
        this.dob = '';
        this.gender = '';
        this.role = '';

        this.router.navigate(['/register']);
    }
    
}