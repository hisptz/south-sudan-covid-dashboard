import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getArrayOfIsoFormattedDates } from 'src/app/core/helpers/get-array-of-iso-date-formatted.helper';
import { getLastNthDates } from 'src/app/core/helpers/get-last-nth-dates.helper';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { State } from 'src/app/store/reducers';
import {
  getSectionThreeAnalyticsData,
  getSectionThreeLoadingStatus,
} from 'src/app/store/selectors/analytic.selectors';
import {
  getConfiguration,
  getConfigurationLoadingStatus,
  getSectionThreeConfiguration,
} from 'src/app/store/selectors/config.selectors';

@Component({
  selector: 'app-tests-conducted-and-positive-cases',
  templateUrl: './tests-conducted-and-positive-cases.component.html',
  styleUrls: ['./tests-conducted-and-positive-cases.component.scss'],
})
export class TestsConductedAndPositiveCasesComponent implements OnInit {
  config$: Observable<any>;
  sectionThreeAnalytics$: Observable<any>;
  sectionThreeConfig$: Observable<any>;
  sectionLoadingStatus$: Observable<any>;
  configLoadingStatus$: Observable<any>;
  @Input() configuration;

  constructor(private store: Store<State>) {}
  days = [
    '19 August 2020',
    '20 August 2020',
    '21 August 2020',
    '22 August 2020',
    '23 August 2020',
    '24 August 2020',
    '25 August 2020',
    '26 August 2020',
    '27 August 2020',
    '28 August 2020',
    '29 August 2020',
    '30 August 2020',
    '31 August 2020',
    '1 September 2020',
  ];
  testsConducted = [
    56,
    49,
    100,
    99,
    124,
    176,
    135,
    148,
    216,
    200,
    187,
    194,
    200,
    221,
  ];
  postiveCases = [3, 6, 9, 14, 18, 21, 25, 26, 23, 28, 40, 52, 49, 60];
  // cumulativeDeathCases = [
  //   7,
  //   13,
  //   22,
  //   36,
  //   54,
  //   75,
  //   100,
  //   126,
  //   149,
  //   167,
  //   172,
  //   180,
  //   193,
  //   202,
  // ]

  chartTitle = 'TESTS CONDUCTED AND POSITIVE CASES IN LAST 14 DAYS';
  rightYAxisTitle = 'Positive cases';
  leftYAxisTitle = 'Tests conducted';
  // rightTertiaryYAxisTitle = 'Cumulative Death Cases';
  xAxisTitle = 'Date';

  ngOnInit(): void {
    if (this.configuration) {
      const last14days = getLastNthDates(15);
      const last14ISOdates = getArrayOfIsoFormattedDates(last14days);
      this.config$ = this.store.select(getConfiguration);
      this.sectionThreeConfig$ = this.store.select(
        getSectionThreeConfiguration
      );
      this.sectionLoadingStatus$ = this.store.select(
        getSectionThreeLoadingStatus
      );
      this.configLoadingStatus$ = this.store.select(
        getConfigurationLoadingStatus
      );
      this.sectionThreeAnalytics$ = this.store.pipe(
        select(getSectionThreeAnalyticsData)
      );

      this.store.dispatch(
        loadAnalyticsData({
          sectionType: SectionType.SECTION_THREE,
          periods: last14ISOdates,
        })
      );
    }
  }
  getLastItem(arr: Array<any>) {
    return arr[arr.length - 1];
  }
  getTotalFromArr(arr: Array<any>) {
    return arr.reduce((a, b) => a + b, 0);
  }
}
