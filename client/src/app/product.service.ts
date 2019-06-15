// import { Injectable } from '@angular/core';

// @Injectable()
export class ProductService
{
    products = [
    {
        "id": 1,
        "name": "Pixel",
        "price": 72000,
        "quantity": 1,
        "description": "Made by Google"
    },
    {
        "id": 10,
        "name": "xz3",
        "price": 66000,
        "quantity": 1,
        "description": "Made by Sony"
    }
];
    constructor()
    {

    }

    getProducts()
    {
        return this.products;
    }
}