import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { State } from 'src/app/store/reducers';
import {
  getSectionFourAnalyticsData,
  getSectionFourLoadingStatus,
} from 'src/app/store/selectors/analytic.selectors';
import {
  getConfiguration,
  getConfigurationLoadingStatus,
  getSectionFourConfiguration,
  getUserOrgUnits,
} from 'src/app/store/selectors/config.selectors';
import { find } from 'lodash';
@Component({
  selector: 'app-summary-table',
  templateUrl: './summary-table.component.html',
  styleUrls: ['./summary-table.component.scss'],
})
export class SummaryTableComponent implements OnInit {
  constructor(private store: Store<State>) {}
  config$: Observable<any>;
  sectionFourAnalytics$: Observable<any>;
  sectionFourConfig$: Observable<any>;
  sectionLoadingStatus$: Observable<any>;
  configLoadingStatus$: Observable<any>;
  userOrgUnits$: Observable<Array<any>>;
  @Input() configuration;

  ngOnInit(): void {
    if (this.configuration) {
      this.config$ = this.store.select(getConfiguration);
      this.sectionFourConfig$ = this.store.select(getSectionFourConfiguration);
      this.sectionLoadingStatus$ = this.store.select(
        getSectionFourLoadingStatus
      );
      this.userOrgUnits$ = this.store.pipe(select(getUserOrgUnits));
      this.configLoadingStatus$ = this.store.select(
        getConfigurationLoadingStatus
      );
      this.sectionFourAnalytics$ = this.store.pipe(
        select(getSectionFourAnalyticsData)
      );

      this.store.dispatch(
        loadAnalyticsData({
          sectionType: SectionType.SECTION_FOUR,
          periods: ['LAST_12_MONTHS'],
        })
      );
    }
  }
  getAnalyticValue(orgUnitId, configItem, analyticsData) {
    let value = '';
    if (analyticsData && analyticsData.length) {
      const dxObj = find(
        analyticsData || [],
        (item) => item.id === configItem.id && item.orgUnit === orgUnitId
      );
      value = dxObj && dxObj.value ? dxObj.value : 0;
    }

    return value;
  }
}
