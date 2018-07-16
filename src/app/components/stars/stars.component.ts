import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auction-stars',
  inputs: ['rating', 'count'],
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  count: number = 5;
  rating: number = 0;
  stars: boolean[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 1; i <= this.count; i++) {
      this.stars.push(i > this.rating);
    }
  }

}
