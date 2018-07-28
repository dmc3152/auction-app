import { EventEmitter, Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";


export class Product {
  constructor(
    public id?: number,
    public title?: string,
    public price?: number,
    public rating?: number,
    public description?: string,
    public categories?: Array<string>) {
  }
}

export class Review {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: Date,
    public user: string,
    public rating: number,
    public comment: string
  ) { }
}

export interface ProductSearchParams {
  title: string;
  minPrice: number;
  maxPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  searchEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) { }

  search(params: ProductSearchParams): Observable<Product[]> {
    return this.http.get('/products', {search: encodeParams(params)})
      .pipe(map(response => response.json()));
  }

  getAllCategories(): string[] {
    return ['Books', 'Electronics', 'Hardware'];
  }

  getProducts(): Observable<Product[]> {
    return this.http.get('/products')
      .pipe(map(response => response.json()));
  }

  getProductById(productId: number): Observable<Product> {
    return this.http.get(`/products/${productId}`)
      .pipe(map(response => response.json()));
  }
  
  getReviewsForProduct(productId: number): Observable<Review[]> {
    return this.http.get(`/products/${productId}/reviews`)
    .pipe(
      map(response => response.json()),
      map(reviews => reviews.map(
        (r: any) => new Review(r.id, r.productId, new Date(r.timestamp), r.user, r.rating, r.comment)))
      );
    }
}

/**
 * Encodes the object into a valid query string.
 */
function encodeParams(params: any): URLSearchParams {
  return Object.keys(params)
    .filter(key => params[key])
    .reduce((accum: URLSearchParams, key: string) => {
      accum.append(key, params[key]);
      return accum;
    }, new URLSearchParams());
}

// var products = [
//   {
//     "id": 0,
//     "title": "First Product",
//     "price": 24.99,
//     "rating": 4.3,
//     "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "categories": ["electronics", "hardware"]
//   },
//   {
//     "id": 1,
//     "title": "Second Product",
//     "price": 64.99,
//     "rating": 3.5,
//     "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "categories": ["books"]
//   },
//   {
//     "id": 2,
//     "title": "Third Product",
//     "price": 74.99,
//     "rating": 4.2,
//     "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "categories": ["electronics"]
//   },
//   {
//     "id": 3,
//     "title": "Fourth Product",
//     "price": 84.99,
//     "rating": 3.9,
//     "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "categories": ["hardware"]
//   },
//   {
//     "id": 4,
//     "title": "Fifth Product",
//     "price": 94.99,
//     "rating": 5,
//     "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "categories": ["electronics", "hardware"]
//   },
//   {
//     "id": 5,
//     "title": "Sixth Product",
//     "price": 54.99,
//     "rating": 4.6,
//     "description": "This is a short description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     "categories": ["books"]
//   }
// ];

// var reviews = [
//   {
//     "id": 0,
//     "productId": 0,
//     "timestamp": "2014-05-20T02:17:00+00:00",
//     "user": "User 1",
//     "rating": 5,
//     "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
//   },
//   {
//     "id": 1,
//     "productId": 0,
//     "timestamp": "2014-05-20T02:53:00+00:00",
//     "user": "User 2",
//     "rating": 3,
//     "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
//   },
//   {
//     "id": 2,
//     "productId": 0,
//     "timestamp": "2014-05-20T05:26:00+00:00",
//     "user": "User 3",
//     "rating": 4,
//     "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
//   },
//   {
//     "id": 3,
//     "productId": 0,
//     "timestamp": "2014-05-20T07:20:00+00:00",
//     "user": "User 4",
//     "rating": 4,
//     "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
//   },
//   {
//     "id": 4,
//     "productId": 0,
//     "timestamp": "2014-05-20T11:35:00+00:00",
//     "user": "User 5",
//     "rating": 5,
//     "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
//   },
//   {
//     "id": 5,
//     "productId": 0,
//     "timestamp": "2014-05-20T11:42:00+00:00",
//     "user": "User 6",
//     "rating": 5,
//     "comment": "Aenean vestibulum velit id placerat posuere. Praesent placerat mi ut massa tempor, sed rutrum metus rutrum. Fusce lacinia blandit ligula eu cursus. Proin in lobortis mi. Praesent pellentesque auctor dictum. Nunc volutpat id nibh quis malesuada. Curabitur tincidunt luctus leo, quis condimentum mi aliquet eu. Vivamus eros metus, convallis eget rutrum nec, ultrices quis mauris. Praesent non lectus nec dui venenatis pretium."
//   }
// ];
