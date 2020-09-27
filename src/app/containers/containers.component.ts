import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DataFilterDialogComponent } from '../shared/dialogs/data-filter-dialog/data-filter-dialog.component';
import { OrgUnitFilterDialogComponent } from '../shared/dialogs/org-unit-filter-dialog/org-unit-filter-dialog.component';
import { PeriodFilterDialogComponent } from '../shared/dialogs/period-filter-dialog/period-filter-dialog.component';
import { State } from '../store/reducers';
import {
  getConfiguration,
  getConfigurationLoadedStatus,
  getConfigurationLoadingStatus,
} from '../store/selectors/config.selectors';
enum DialogType {
  METADATA = 'METADATA',
  ORG_UNIT = 'ORG_UNIT',
  PERIOD = 'PERIOD',
}
@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.scss'],
})
export class ContainersComponent implements OnInit {
  configLoadingStatus$: Observable<boolean>;
  configLoadedStatus$: Observable<boolean>;
  config$: Observable<any>;
  dialogType = {
    orgUnit: DialogType.ORG_UNIT,
    metadata: DialogType.METADATA,
    period: DialogType.PERIOD,
  };

  constructor(private store: Store<State>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.configLoadingStatus$ = this.store.pipe(
      select(getConfigurationLoadingStatus)
    );
    this.configLoadedStatus$ = this.store.pipe(
      select(getConfigurationLoadedStatus)
    );
    this.config$ = this.store.select(getConfiguration);
  }
  openSelectionDialog(type: DialogType) {
    let dialogRef = null;
    switch (type) {
      case DialogType.METADATA:
        dialogRef = this.dialog.open(DataFilterDialogComponent, {
          width: '1500px',
        });
        break;
      case DialogType.ORG_UNIT:
        dialogRef = this.dialog.open(OrgUnitFilterDialogComponent, {
          width: '1500px',
        });
        break;
      case DialogType.PERIOD:
        dialogRef = this.dialog.open(PeriodFilterDialogComponent, {
          width: '1500px',
        });
        break;
      default:
        dialogRef = null;
    }
    if (dialogRef) {
      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
      });
    }
  }
}
