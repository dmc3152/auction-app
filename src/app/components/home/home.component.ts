import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Product, ProductService } from '../../services/product.service';
import { FilterPipe } from "../../pipes/filter.pipe";
import { Observable } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'auction-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Observable<Product[]>;
  titleFilter: FormControl = new FormControl();
  filterCriteria: string;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();

    this.productService.searchEvent
      .subscribe(
        params => this.products = this.productService.search(params),
        err => console.log("Can't get products. Error code: %s, URL: %s "),
        () => console.log('DONE')
      );

    this.titleFilter.valueChanges
      .pipe(
        debounceTime(100)
      )
      .subscribe(
        value => this.filterCriteria = value,
        error => console.error(error)
      );
  }

  ngOnInit() {
  }

}
