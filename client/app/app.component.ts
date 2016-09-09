import { Component } from '@angular/core';
import '../../public/stylesheets/styles.css';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Welcome to Meanshop';
  product: Product = {
    id: 1,
    name: 'Building an e-Commerce app with MEAN',
    price: 7
  };
}

export class Product {
  id: number | string;
  name: string;
  price: number;
}
