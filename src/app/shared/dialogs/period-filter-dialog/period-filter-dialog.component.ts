import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-period-filter-dialog',
  templateUrl: './period-filter-dialog.component.html',
  styleUrls: ['./period-filter-dialog.component.scss'],
})
export class PeriodFilterDialogComponent implements OnInit {
  title = '';
  constructor(
    public dialogRef: MatDialogRef<PeriodFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.title = this.data && this.data.title ? this.data.title : '';
  }
}
