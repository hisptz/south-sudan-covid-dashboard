import { Component, OnInit, Inject } from '@angular/core';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { PeriodFilterConfig } from '@iapps/ngx-dhis2-period-filter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selection-filters',
  templateUrl: './selection-filters.component.html',
  styleUrls: ['./selection-filters.component.scss'],
})
export class SelectionFiltersComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SelectionFiltersComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
  title = '';
  step = 0;
  selectedDataItems: any[] = [];
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
  selectedPeriods = [];
  periodFilterConfig: PeriodFilterConfig = {
    singleSelection: true,
    emitOnSelection: false,
    childrenPeriodSortOrder: 'ASC',
    allowDateRangeSelection: true,
    allowRelativePeriodSelection: true,
    allowFixedPeriodSelection: true,
  };

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {
    this.inititializeData();
  }
  inititializeData() {
    this.selectedDataItems =
      this.data && this.data.selectedData && this.data.selectedData.length
        ? this.data.selectedItems
        : [];
    this.selectedOrgUnitItems =
      this.data &&
      this.data.selectedOrgUnits &&
      this.data.selectedOrgUnits.length
        ? this.data.selectedItems
        : [];
    this.selectedPeriods =
      this.data && this.data.selectedPeriods && this.data.selectedPeriods.length
        ? this.data.selectedItems
        : [];
    this.title = this.data && this.data.title ? this.data.title : '';
  }
  onOrgUnitUpdate(data, action) {
    if (action === 'CHANGE') {
      this.selectedOrgUnitItems =
        data && data.items && data.items.length ? data.items : [];
    } else {
    }
    this.nextStep();
  }
  onPeriodUpdate(data: any, action: string) {
    if (action === 'CHANGE') {
      this.selectedPeriods =
        data && data.items && data.items.length ? data.items : [];
    }
    this.dialogRef.close({
      periods: this.selectedPeriods,
      dataItems: this.selectedDataItems,
      orgUnits: this.selectedOrgUnitItems,
    });
  }
  onDataUpdate(data: any, action: string) {
    if (action === 'CHANGE') {
      this.selectedDataItems =
        data && data.items && data.items.length ? data.items : [];
    }
    this.nextStep();
  }
}
