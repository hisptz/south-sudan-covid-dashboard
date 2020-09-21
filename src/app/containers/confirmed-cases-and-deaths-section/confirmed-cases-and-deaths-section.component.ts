import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { loadAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { getLastNthDates } from 'src/app/core/helpers/get-last-nth-dates.helper';
import { getArrayOfIsoFormattedDates } from 'src/app/core/helpers/get-array-of-iso-date-formatted.helper';
import {
  getConfiguration,
  getConfigurationLoadingStatus,
  getSectionTwoConfiguration,
} from 'src/app/store/selectors/config.selectors';
import {
  getSectionTwoAnalyticsData,
  getSectionTwoLoadingStatus,
} from 'src/app/store/selectors/analytic.selectors';
import { generateCumulativeFrequency } from 'src/app/core/helpers/generate-cumulative-frequency.helper';
@Component({
  selector: 'app-confirmed-cases-and-deaths-section',
  templateUrl: './confirmed-cases-and-deaths-section.component.html',
  styleUrls: ['./confirmed-cases-and-deaths-section.component.scss'],
})
export class ConfirmedCasesAndDeathsSectionComponent implements OnInit {
  constructor(private store: Store<State>) {}
  config$: Observable<any>;
  sectionTwoAnalytics$: Observable<any>;
  sectionTwoConfig$: Observable<any>;
  sectionLoadingStatus$: Observable<any>;
  configLoadingStatus$: Observable<any>;
  @Input() configuration;

  chartTitle = 'CONFIRMED CASES AND DEATHS IN LAST 14 DAYS';
  rightYAxisTitle = 'Death cases';
  leftYAxisTitle = 'Confirmed cases';
  rightTertiaryYAxisTitle = 'Cumulative Death Cases';
  xAxisTitle = 'Date';
  ngOnInit(): void {
    if (this.configuration) {
      const last14days = getLastNthDates(14);
      const last14ISOdates = getArrayOfIsoFormattedDates(last14days);
      this.config$ = this.store.select(getConfiguration);
      this.sectionTwoConfig$ = this.store.select(getSectionTwoConfiguration);
      this.sectionLoadingStatus$ = this.store.select(
        getSectionTwoLoadingStatus
      );
      this.configLoadingStatus$ = this.store.select(
        getConfigurationLoadingStatus
      );
      this.sectionTwoAnalytics$ = this.store.pipe(
        select(getSectionTwoAnalyticsData)
      );

      this.store.dispatch(
        loadAnalyticsData({
          sectionType: SectionType.SECTION_TWO,
          periods: last14ISOdates,
        })
      );
    }
  }

  getCumulativeData(data) {
    return generateCumulativeFrequency(data);
  }
  getLastItem(arr: Array<any>) {
    return arr[arr.length - 1];
  }
  getTotalFromArr(arr: Array<any>) {
    return arr.reduce((a, b) => a + b, 0);
  }
}
