import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SectionType } from 'src/app/core/models/dashboard.model';
import {
  loadAnalyticsData,
  prepareToLoadAnalyticsData,
} from 'src/app/store/actions/analytic.actions';
import { loadConfiguration } from 'src/app/store/actions/config.actions';
import { State } from 'src/app/store/reducers';
import {
  getSectionOneAnalyticsData,
  getSectionOneLoadingStatus,
} from 'src/app/store/selectors/analytic.selectors';
import {
  getConfiguration,
  getConfigurationLoadedStatus,
  getConfigurationLoadingStatus,
  getSectionOneConfiguration,
} from 'src/app/store/selectors/config.selectors';
import { getLastNthDates } from 'src/app/core/helpers/get-last-nth-dates.helper';
import { getArrayOfIsoFormattedDates } from 'src/app/core/helpers/get-array-of-iso-date-formatted.helper';

@Component({
  selector: 'app-case-surveillance-testing',
  templateUrl: './case-surveillance-testing.component.html',
  styleUrls: ['./case-surveillance-testing.component.scss'],
})
export class CaseSurveillanceTestingComponent implements OnInit {
  sectionType = SectionType.CASE_SURVEILLANCE;
  sectionOneConfig$: Observable<any>;
  configLoadingStatus$: Observable<boolean>;
  sectionLoadingStatus$: Observable<boolean>;
  configLoadedStatus$: Observable<boolean>;
  @Input() configuration;
  config$: Observable<any>;
  sectionOneAnalytics$: Observable<any>;
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
        select(getSectionOneLoadingStatus)
      );

      this.config$ = this.store.select(getConfiguration);
      this.sectionOneConfig$ = this.store.pipe(
        select(getSectionOneConfiguration)
      );
      this.sectionOneAnalytics$ = this.store.pipe(
        select(getSectionOneAnalyticsData)
      );
      // this.config$.subscribe((conf) => {
      //   if (conf) {
      this.store.dispatch(
        loadAnalyticsData({
          sectionType: SectionType.SECTION_ONE,
          periods: ['LAST_12_MONTHS'],
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
