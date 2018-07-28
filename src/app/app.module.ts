import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";

import { AppComponent } from './components/application/app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { SearchComponent } from './components/search/search.component';
import { StarsComponent } from './components/stars/stars.component';

import { FilterPipe } from "./pipes/filter.pipe";

import { ProductService } from "./services/product.service";
import { BidService } from "./services/bid.service";
import { WebsocketService } from "./services/websocket.service";

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    FooterComponent,
    HomeComponent,
    NavbarComponent,
    ProductDetailComponent,
    ProductItemComponent,
    SearchComponent,
    StarsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'products/:productId', component: ProductDetailComponent }
    ]),
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    ProductService,
    BidService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
