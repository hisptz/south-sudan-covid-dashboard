import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadAnalyticsData } from 'src/app/store/actions/analytic.actions';
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
import * as moment from 'moment';
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
  config$: Observable<any>;
  sectionOneAnalytics$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // this.store.dispatch(loadConfiguration());
    const last14days = getLastNthDates(14);
    const last14ISOdates = getArrayOfIsoFormattedDates(last14days);

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
    this.config$.subscribe((conf) => {
      if (conf) {
        this.store.dispatch(
          loadAnalyticsData({
            sectionType: SectionType.SECTION_ONE,
            periods: last14ISOdates,
          })
        );
      }
    });
  }

  updateData(data) {
  
  }

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
