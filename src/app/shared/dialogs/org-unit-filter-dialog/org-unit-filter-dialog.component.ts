import { Component, OnInit, Input, Inject } from '@angular/core';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-org-unit-filter-dialog',
  templateUrl: './org-unit-filter-dialog.component.html',
  styleUrls: ['./org-unit-filter-dialog.component.scss'],
})
export class OrgUnitFilterDialogComponent implements OnInit {
  title = '';
  selectedOrgUnitItems: any[] = [];
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
  constructor(
    public dialogRef: MatDialogRef<OrgUnitFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.selectedOrgUnitItems =
      this.data && this.data.selectedItems && this.data.selectedItems.length
        ? this.data.selectedItems
        : [];
    this.title = this.data && this.data.title ? this.data.title : '';
  }
}
