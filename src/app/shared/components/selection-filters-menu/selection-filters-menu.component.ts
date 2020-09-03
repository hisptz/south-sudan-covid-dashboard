import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selection-filters-menu',
  templateUrl: './selection-filters-menu.component.html',
  styleUrls: ['./selection-filters-menu.component.scss']
})
export class SelectionFiltersMenuComponent implements OnInit {
  @Input() hasDataFilter = true;
  @Input() hasPeriodFilter = true;
  @Input() hasOrgUnitFilter = true;
  constructor() { }

  ngOnInit(): void {
  }

}
