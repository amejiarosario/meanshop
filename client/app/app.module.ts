import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent, ProductDetailsComponent } from '../+products';
import { routing } from "./app.routing";
import { HomeComponent } from "../+home/home.component";

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
