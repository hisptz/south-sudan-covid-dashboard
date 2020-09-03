import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-data-filter-dialog',
  templateUrl: './data-filter-dialog.component.html',
  styleUrls: ['./data-filter-dialog.component.scss'],
})
export class DataFilterDialogComponent implements OnInit {
  title = '';
  constructor(
    public dialogRef: MatDialogRef<DataFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.title = this.data && this.data.title ? this.data.title : '';
  }
}
