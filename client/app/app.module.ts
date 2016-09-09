import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent, ProductDetailsComponent } from '../+products';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailsComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
