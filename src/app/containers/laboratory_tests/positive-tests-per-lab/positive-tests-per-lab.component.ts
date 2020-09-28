import { Component, Input, OnInit } from '@angular/core';
import {  select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadAnalyticsData, loadLabAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { State } from 'src/app/store/reducers';
import { getSectionSevenAnalyticsData, getSectionSevenLoadingStatus } from 'src/app/store/selectors/analytic.selectors';
import { getConfigurationLoadingStatus, getSectionSevenConfiguration } from 'src/app/store/selectors/config.selectors';

@Component({
  selector: 'app-positive-tests-per-lab',
  templateUrl: './positive-tests-per-lab.component.html',
  styleUrls: ['./positive-tests-per-lab.component.scss']
})
export class PositiveTestsPerLabComponent implements OnInit {
  config$: Observable<any>;
  sectionSevenAnalytics$: Observable<any>;
  sectionSevenConfig$: Observable<any>;
  sectionLoadingStatus$: Observable<any>;
  configLoadingStatus$: Observable<any>;
  @Input() configuration;
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    if (this.configuration) {
      this.getAnalytics();
    }
  }

  getAnalytics() {
    this.sectionSevenConfig$ = this.store.select(getSectionSevenConfiguration);
    this.sectionLoadingStatus$ = this.store.select(
      getSectionSevenLoadingStatus
    );
    this.configLoadingStatus$ = this.store.select(
      getConfigurationLoadingStatus
    );
    this.sectionSevenAnalytics$ = this.store.pipe(
      select(getSectionSevenAnalyticsData)
    );

    this.store.dispatch(
      loadLabAnalyticsData({
        sectionType: SectionType.SECTION_SEVEN,
        periods: ['LAST_12_WEEKS'],
      })
    );
  }

}
