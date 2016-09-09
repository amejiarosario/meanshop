import { Component, Input } from '@angular/core';
import { Product } from './product';

@Component({
    selector: 'product-detail',
    templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent {
  @Input()
  product: Product;
}
