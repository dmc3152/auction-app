import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ProductService } from "../../services/product.service";

@Component({
  selector: 'auction-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  categories: string[];
  formModel: FormGroup;

  constructor(private productService: ProductService) {
    this.categories = this.productService.getAllCategories();
    const fb = new FormBuilder();
    this.formModel = fb.group({
      'title': [null, Validators.minLength(3)],
      'price': [null, positiveNumberValidator],
      'category': [-1]
    });
  }

  ngOnInit() {
  }

  onSearch() {
    if (this.formModel.valid) {
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }

}

function positiveNumberValidator(control: FormControl): any {
  if (!control.value) return null;
  const price = parseInt(control.value);
  return price === null || typeof price === 'number' && price > 0 ? null : { positiveNumber: true };
}
