import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
    selector : 'mak-design',
    templateUrl : './product.list.component.html',
    styleUrls : ['./product.list.component.css']
})

export class products_m{

    products : any[];

    service : ProductService;
    constructor()
    {
        this.service = new ProductService();
        this.products = this.service.getProducts();
    }

}