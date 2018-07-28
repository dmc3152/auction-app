import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'auction-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  private _rating;
  stars: boolean[];
  private maxStars: number = 5;
  @Input() readOnly: boolean = true;
  @Input() get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value || 0;
    this.stars = Array(this.maxStars).fill(true, 0, this.rating);
  }

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  fillStarsWithColor(index) {
    if (!this.readOnly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }

  constructor() { }

  ngOnInit() { }

}
