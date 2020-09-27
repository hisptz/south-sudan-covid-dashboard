import { Component, Input, OnInit } from '@angular/core';
import {  select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { State } from 'src/app/store/reducers';
import { getSectionSixAnalyticsData, getSectionSixLoadingStatus } from 'src/app/store/selectors/analytic.selectors';
import { getConfiguration, getConfigurationLoadedStatus, getConfigurationLoadingStatus, getSectionSixConfiguration } from 'src/app/store/selectors/config.selectors';

@Component({
  selector: 'app-laboratory-overall-summary',
  templateUrl: './laboratory-overall-summary.component.html',
  styleUrls: ['./laboratory-overall-summary.component.scss']
})
export class LaboratoryOverallSummaryComponent implements OnInit {
  sectionSixConfig$: Observable<any>;
  configLoadingStatus$: Observable<boolean>;
  sectionLoadingStatus$: Observable<boolean>;
  configLoadedStatus$: Observable<boolean>;
  @Input() configuration;
  config$: Observable<any>;
  sectionSixAnalytics$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    if (this.configuration) {
      this.configLoadingStatus$ = this.store.pipe(
        select(getConfigurationLoadingStatus)
      );
      this.configLoadedStatus$ = this.store.pipe(
        select(getConfigurationLoadedStatus)
      );
      this.sectionLoadingStatus$ = this.store.pipe(
        select(getSectionSixLoadingStatus)
      );

      this.config$ = this.store.select(getConfiguration);
      this.sectionSixConfig$ = this.store.pipe(
        select(getSectionSixConfiguration)
      );
      this.sectionSixAnalytics$ = this.store.pipe(
        select(getSectionSixAnalyticsData)
      );
      // this.config$.subscribe((conf) => {
      //   if (conf) {
      this.store.dispatch(
        loadAnalyticsData({
          sectionType: SectionType.SECTION_SIX,
          periods: ['THIS_YEAR'],
        })
      );
      //   }
      // });
    }
  }
  updateData(data) {}

  getValueFromAnalytics(dx, analyticsData: any[]) {
    let value = '';
    for (const item of analyticsData) {
      if (item && item.id && item.value && item.id === dx) {
        value = item.value;
      }
    }
    return value;
  }

}
