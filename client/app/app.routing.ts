import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "../+home/home.component";
import { ProductsComponent } from "../+products/products.component";
import { ProductDetailsComponent } from "../+products/product-details.component";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
