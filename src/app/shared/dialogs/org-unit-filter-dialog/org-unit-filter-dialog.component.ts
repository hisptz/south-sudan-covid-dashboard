import { Component, OnInit, Input, Inject } from '@angular/core';
import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getConfigurationList } from 'src/app/store/selectors/config.selectors';
import { getAllSectionAnalytics } from 'src/app/store/selectors/analytic.selectors';
import { find } from 'lodash';

@Component({
  selector: 'app-org-unit-filter-dialog',
  templateUrl: './org-unit-filter-dialog.component.html',
  styleUrls: ['./org-unit-filter-dialog.component.scss'],
})
export class OrgUnitFilterDialogComponent implements OnInit {
  title = '';
  selectedItems: any[] = [];
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

  configurations$: Observable<any>;
  analytics$: Observable<any>;
  constructor(
    private store$: Store<State>,
    public dialogRef: MatDialogRef<OrgUnitFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.selectedItems = [];
    this.configurations$ = this.store$.pipe(select(getConfigurationList));
    this.analytics$ = this.store$.pipe(select(getAllSectionAnalytics));
  }
  onOrgUnitUpdate(data: any, action: string) {
    if (action === 'CHANGE') {
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
    }
  }
  showFilter(itemId, analyticsData, section) {
    const analyticsObj = find(
      analyticsData[section] || [],
      (data) => data.id === itemId
    );
    this.selectedItems =
      analyticsObj && analyticsObj.orgUnit
        ? [...[], { id: analyticsObj.orgUnit }]
        : [];
  }
}
