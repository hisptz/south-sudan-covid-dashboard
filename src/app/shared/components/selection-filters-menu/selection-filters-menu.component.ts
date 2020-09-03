import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrgUnitFilterDialogComponent } from '../../dialogs/org-unit-filter-dialog/org-unit-filter-dialog.component';
import { DataFilterDialogComponent } from '../../dialogs/data-filter-dialog/data-filter-dialog.component';
import { PeriodFilterDialogComponent } from '../../dialogs/period-filter-dialog/period-filter-dialog.component';
import { SectionType, SectionTitle } from 'src/app/core/models/dashboard.model';

@Component({
  selector: 'app-selection-filters-menu',
  templateUrl: './selection-filters-menu.component.html',
  styleUrls: ['./selection-filters-menu.component.scss'],
})
export class SelectionFiltersMenuComponent implements OnInit {
  @Input() hasDataFilter = true;
  @Input() hasPeriodFilter = true;
  @Input() hasOrgUnitFilter = true;
  @Input() selectedOrgUnits: any[] = [];
  @Input() selectedPeriods: any[] = [];
  @Input() selectedData: any[] = [];
  @Input() section: SectionType;
  dialogTitle = '';
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.assignTitles();
  }

  assignTitles() {
    if (this.section) {
      try {
        this.dialogTitle = SectionTitle[this.section];
      } catch (e) {
        this.dialogTitle = '';

      }
    }
  }

  openOrgUnitFilterDialog() {
    console.log({ title: this.dialogTitle });
    const dialogRef = this.dialog.open(OrgUnitFilterDialogComponent, {
      width: '600px',
      data: {
        selectedItems: this.selectedOrgUnits,
        title: this.dialogTitle,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
  openDataFilterDialog() {
    const dialogRef = this.dialog.open(DataFilterDialogComponent, {
      width: '600px',
      data: { selectedItems: this.selectedData, title: this.dialogTitle },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
  openPeriodFilterDialog() {
    const dialogRef = this.dialog.open(PeriodFilterDialogComponent, {
      width: '600px',
      data: {
        selectedItems: this.selectedPeriods,
        title: this.dialogTitle,
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
