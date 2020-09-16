import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrgUnitFilterDialogComponent } from '../../dialogs/org-unit-filter-dialog/org-unit-filter-dialog.component';
import { DataFilterDialogComponent } from '../../dialogs/data-filter-dialog/data-filter-dialog.component';
import { PeriodFilterDialogComponent } from '../../dialogs/period-filter-dialog/period-filter-dialog.component';
import { SectionType, SectionTitle } from 'src/app/core/models/dashboard.model';
import { take } from 'rxjs/operators';
import { SelectionFiltersComponent } from '../../dialogs/selection-filters/selection-filters.component';

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
  @Output() dataFilterEvent = new EventEmitter<any>();
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

  openSelectionFilterDialog() {
    console.log({title: this.dialogTitle});
    const dialogRef = this.dialog.open(SelectionFiltersComponent, {
      width: '1000px',
      data: {
        selectedData: this.selectedData,
        selectedOrgUnits: this.selectedOrgUnits,
        selectedPeriods: this.selectedPeriods,
        title: this.dialogTitle,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log({ result });
      if (result) {
        this.dataFilterEvent.emit(result);
      }
    });
  }
}
