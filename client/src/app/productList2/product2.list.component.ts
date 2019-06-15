import { Component } from '@angular/core';
import { Product2Service } from './../product2.service';

@Component({
    selector : 'product2-mak',
    templateUrl : './product2.list.component.html',
    styleUrls : ['./product2.list.component.css']
})

export class product2_m{

    service : Product2Service;
    products : any[];

    constructor( service : Product2Service )
    {
        this.service = service;
        this.reloadProducts();
    }

    reloadProducts(){
        const observable = this.service.getProducts();
            observable.subscribe((response)=>{
                const result_returned = response.json();
                debugger;
                if (result_returned.message === 'Success') 
                {
                    this.products = result_returned.result;
                }
                else 
                {
                    alert('error occured');
                }
                console.log(result_returned);
            // this.products = result.data;
        });
    }
}