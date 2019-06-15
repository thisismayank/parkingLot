import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { players_m } from './../player.service';

@Component({
    selector : 'create-mak',
    templateUrl : './create.product.component.html',
    styleUrls : ['./create.product.component.css']
})

export class createProduct_m
{
    service : players_m;

    constructor( service: players_m, private router: Router, private route : ActivatedRoute )
    {
        this.service = service;

        route.queryParams.subscribe((params)=>{
            
            console.log(params);
            var id = params.id;
            this.service.getById(id).subscribe((response)=>{
                debugger;
                var result = response.json();
                var player = result.result;

                this.name = player[0].name;
                this.club = player[0].club;
                this.rating = player[0].rating;
                this.description = player[0].description;
            });
        });

    }

    name = '';
    club = '';
    rating = 0;
    description = '';
    image : any;

    onSelectedFile(event)
    {
        this.image = event.target.files[0];
    }

    onSave()
    {
        this.service.postPlayers(this.name, this.club, this.rating, this.description, this.image).subscribe((response)=>{
            console.log(response);
        });
        this.router.navigate(['/list']);
    }

    onCancel()
    {
        this.name = '';
        this.club = '';
        this.rating = 0 ;
        this.description = '';
        this.router.navigate(['/update']);
    }
    
}