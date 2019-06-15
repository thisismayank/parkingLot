import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class players_m
{
    baseUrl = 'http://localhost:4000/players';
    http : Http;

    constructor( http : Http )
    {
        this.http = http;
    }

    public getPlayers()
    {
        return this.http.get(this.baseUrl);
    }

    public postPlayers(name, club, rating, description, image:any )
    {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('club', club);
        formData.append('rating', ''+rating);
        formData.append('description', description);
        formData.append('image', image);

        return this.http.post(this.baseUrl + '/upload', formData );
    }

    public deletePlayer(id)
    {
        return this.http.delete(this.baseUrl + '/' + id);
    }

    public getById(id)
    {
        return this.http.get(this.baseUrl + '/' + id);
    }
}
