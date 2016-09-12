import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule }   from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { routing } from "./app.routing";
import { AppComponent } from './app.component';
import { HomeComponent } from "../+home/home.component";
import { ProductsComponent, ProductDetailsComponent } from '../+products';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
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
