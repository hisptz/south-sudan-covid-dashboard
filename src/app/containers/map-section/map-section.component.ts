import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { MAP_GEO } from './map-geo';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import {
  getConfiguration,
  getConfigurationLoadingStatus,
  getLowerLevelUserOrgUnitIds,
  getLowerLevelUserOrgUnits,
  getSectionFiveConfiguration,
} from 'src/app/store/selectors/config.selectors';
import {
  getSectionFiveAnalyticsData,
  getSectionFiveLoadingStatus,
} from 'src/app/store/selectors/analytic.selectors';
import {
  loadAnalyticsData,
  loadMapAnalyticsData,
} from 'src/app/store/actions/analytic.actions';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { getLastNthDates } from 'src/app/core/helpers/get-last-nth-dates.helper';
import { getArrayOfIsoFormattedDates } from 'src/app/core/helpers/get-array-of-iso-date-formatted.helper';

@Component({
  selector: 'app-map-section',
  templateUrl: './map-section.component.html',
  styleUrls: ['./map-section.component.scss'],
})
export class MapSectionComponent implements OnInit, AfterViewInit {
  mapGeo: any;

  currentChart: any;
  currentDevice: string;

  config$: Observable<any>;
  sectionFiveAnalytics$: Observable<any>;
  sectionFiveConfig$: Observable<any>;
  sectionLoadingStatus$: Observable<any>;
  configLoadingStatus$: Observable<any>;
  stateOrgUnits$: Observable<Array<any>>;
  stateOrgUnitIds$: Observable<Array<any>>;

  constructor(private store: Store<State>) {
    this.mapGeo = MAP_GEO.ss;
  }

  ngOnInit(): void {
    const last14days = getLastNthDates(14);
    const last14ISOdates = getArrayOfIsoFormattedDates(last14days);
    this.config$ = this.store.select(getConfiguration);
    this.sectionFiveConfig$ = this.store.select(getSectionFiveConfiguration);
    this.sectionLoadingStatus$ = this.store.select(getSectionFiveLoadingStatus);
    this.stateOrgUnits$ = this.store.pipe(select(getLowerLevelUserOrgUnits));
    this.stateOrgUnitIds$ = this.store.pipe(
      select(getLowerLevelUserOrgUnitIds)
    );
    this.configLoadingStatus$ = this.store.select(
      getConfigurationLoadingStatus
    );
    this.sectionFiveAnalytics$ = this.store.pipe(
      select(getSectionFiveAnalyticsData)
    );
    this.config$.subscribe((conf) => {
      if (conf) {
        this.store.dispatch(
          loadMapAnalyticsData({
            sectionType: SectionType.SECTION_FIVE,
            periods: last14ISOdates,
          })
        );
      }
    });
  }

  ngAfterViewInit() {
  }

  
}
