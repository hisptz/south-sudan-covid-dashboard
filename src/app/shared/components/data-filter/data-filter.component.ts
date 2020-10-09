import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss'],
})
export class DataFilterComponent implements OnInit {
  @Input() unselectedItems = [];
  constructor() {}

  ngOnInit(): void {
    console.log({ unselected: this.unselectedItems });
  }
}
