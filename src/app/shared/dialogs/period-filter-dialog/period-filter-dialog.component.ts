import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodFilterConfig } from '@iapps/ngx-dhis2-period-filter';

@Component({
  selector: 'app-period-filter-dialog',
  templateUrl: './period-filter-dialog.component.html',
  styleUrls: ['./period-filter-dialog.component.scss'],
})
export class PeriodFilterDialogComponent implements OnInit {
  title = '';
  selectedPeriods = [];
  periodFilterConfig: PeriodFilterConfig = {
    singleSelection: true,
    emitOnSelection: false,
    childrenPeriodSortOrder: 'ASC',
    allowDateRangeSelection: true,
    allowRelativePeriodSelection: true,
    allowFixedPeriodSelection: true,
  };
  constructor(
    public dialogRef: MatDialogRef<PeriodFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.selectedPeriods =
      this.data && this.data.selectedItems && this.data.selectedItems.length
        ? this.data.selectedItems
        : [];
    this.title = this.data && this.data.title ? this.data.title : '';
  }

  onPeriodUpdate(data: any, action: string) {
    if (action === 'CHANGE') {
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
    }
  }
}
