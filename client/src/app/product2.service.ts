import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class Product2Service
{
    http : Http;
    baseUrl = "http://localhost:4000/products";

    constructor(http : Http)
    {
        this.http = http;    
    }

    public getProducts()
    {
       var result = this.http.get(this.baseUrl);
        return result;
    }
}