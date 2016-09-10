import { Component, Input, OnInit } from '@angular/core';
import { Product } from './product';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'product-detail',
    templateUrl: 'product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: any) => console.log('Products id: ', params.id)
    });
  }

  @Input()
  product: Product;
}
