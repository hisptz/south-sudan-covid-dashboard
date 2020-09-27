import { Component, Input, OnInit } from '@angular/core';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';

@Component({
  selector: 'app-org-unit-filter',
  templateUrl: './org-unit-filter.component.html',
  styleUrls: ['./org-unit-filter.component.scss'],
})
export class OrgUnitFilterComponent implements OnInit {
  @Input() selectedItems = [];
  orgUnitFilterConfig: OrgUnitFilterConfig = {
    singleSelection: true,
    showUserOrgUnitSection: false,
    showOrgUnitLevelGroupSection: false,
    showOrgUnitGroupSection: false,
    showOrgUnitLevelSection: false,
    reportUse: false,
    additionalQueryFields: ['dataSets'],
    batchSize: 400,
  };

  constructor() {}

  ngOnInit(): void {
    console.log({ selectedItems: this.selectedItems });
  }
}
