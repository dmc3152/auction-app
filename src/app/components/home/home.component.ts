import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Product, ProductService } from '../../services/product.service';
import { FilterPipe } from "../../pipes/filter.pipe";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'auction-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  titleFilter: FormControl = new FormControl();
  filterCriteria: string;

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
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
