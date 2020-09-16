import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { omit } from 'lodash';
@Component({
  selector: 'app-data-filter-dialog',
  templateUrl: './data-filter-dialog.component.html',
  styleUrls: ['./data-filter-dialog.component.scss'],
})
export class DataFilterDialogComponent implements OnInit {
  title = '';
  selectedItems = [];
  constructor(
    public dialogRef: MatDialogRef<DataFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.selectedItems =
      this.data && this.data.selectedItems && this.data.selectedItems.length
        ? this.data.selectedItems
        : [];
    this.title = this.data && this.data.title ? this.data.title : '';
  }
  onDataUpdate(data: any, action: string) {
    if (action === 'CHANGE') {
      const updatedData = data && data.changed ? omit(data, 'changed') : data;
      this.selectedItems =
        updatedData && updatedData.items
          ? updatedData.items
          : this.selectedItems;
      console.log({ updatedData });
      this.dialogRef.close('One');
    } else {
      this.dialogRef.close();
    }
  }
}
