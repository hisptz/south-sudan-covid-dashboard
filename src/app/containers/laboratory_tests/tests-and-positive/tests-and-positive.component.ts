import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadTypeOfTestsAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { State } from 'src/app/store/reducers';
import { getSectionEightAnalyticsData, getSectionEightLoadingStatus } from 'src/app/store/selectors/analytic.selectors';
import { getConfigurationLoadingStatus, getSectionEightConfiguration } from 'src/app/store/selectors/config.selectors';

@Component({
  selector: 'app-tests-and-positive',
  templateUrl: './tests-and-positive.component.html',
  styleUrls: ['./tests-and-positive.component.scss']
})
export class TestsAndPositiveComponent implements OnInit {
  config$: Observable<any>;
  sectionEightAnalytics$: Observable<any>;
  sectionEightConfig$: Observable<any>;
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
    this.sectionEightConfig$ = this.store.select(getSectionEightConfiguration);
    this.sectionLoadingStatus$ = this.store.select(
      getSectionEightLoadingStatus
    );
    this.configLoadingStatus$ = this.store.select(
      getConfigurationLoadingStatus
    );
    this.sectionEightAnalytics$ = this.store.pipe(
      select(getSectionEightAnalyticsData)
    );

    this.store.dispatch(
      loadTypeOfTestsAnalyticsData({
        sectionType: SectionType.SECTION_EIGHT,
        periods: ['LAST_12_WEEKS'],
      })
    );
  }

}
