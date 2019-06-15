import { Component } from '@angular/core';
import { players_m } from './../player.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector : 'movie-list-mak',
    templateUrl : './movie.list.component.html',
    styleUrls : ['./movie.list.component.css']
})

export class player_m{

    service : players_m;
    products : any[];
    name = '';
    club = '';
    rating = 0;
    description = '';

    constructor( service : players_m, private router : Router )
    {
        this.service = service;
        this.reloadProducts();
    }

    reloadProducts(){
        const observable = this.service.getPlayers();
            observable.subscribe((response)=>{
                const result_returned = response.json();
                // debugger;
                if (result_returned.message === 'Success') 
                {
                    this.products = result_returned.result;
                }
                else 
                {
                    alert('error occured');
                }
                // console.log(result_returned);
            // this.products = result.data;
        });
    }

    onDelete(id)
    {
        this.service.deletePlayer(id).subscribe((response)=>{
            const result = response.json();
            if(result.message === 'Success')
            {
                this.reloadProducts();
            }
            else{
                alert('error aya');
            }
        })
    }

    onEdit(id)
    {
        this.router.navigate(['/update'], {queryParams:{id : id}});
    }
}