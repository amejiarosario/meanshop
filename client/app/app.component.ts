import {Component} from '@angular/core';

import '../../public/stylesheets/styles.css';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to Meanshop';

  selectedProduct: Product;

  onSelect(product: Product){
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

export class Product {
  id: number | string;
  name: string;
  price: number;
}
