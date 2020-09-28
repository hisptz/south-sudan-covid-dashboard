import { Component, Input, OnInit } from '@angular/core';
import {  Store } from '@ngrx/store';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadAnalyticsData, loadLabAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { State } from 'src/app/store/reducers';

@Component({
  selector: 'app-positive-tests-per-lab',
  templateUrl: './positive-tests-per-lab.component.html',
  styleUrls: ['./positive-tests-per-lab.component.scss']
})
export class PositiveTestsPerLabComponent implements OnInit {
  @Input() configuration;
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    if (this.configuration) {
      this.getAnalytics();
    }
  }

  getAnalytics() {
    this.store.dispatch(
      loadLabAnalyticsData({
        sectionType: SectionType.SECTION_SEVEN,
        periods: ['LAST_12_WEEKS'],
      })
    );
  }

}
