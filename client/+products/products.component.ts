import {Component, OnInit} from '@angular/core';
import {Product} from './product';

@Component({
  selector: 'products',
  templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnInit {
  constructor() { }

  ngOnInit() { }

  selectedProduct: Product;

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  products: Product[] = [
    {
      id: 1,
      name: 'Building an e-Commerce app with MEAN',
      price: 8
    },
    {
      id: 2,
      name: 'Getting started with Angular 2 and ES6',
      price: 7
    },
    {
      id: 3,
      name: 'Modern JavaScript',
      price: 6
    }
  ];

}
