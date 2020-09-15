import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { loadAnalyticsData } from 'src/app/store/actions/analytic.actions';
import { State } from 'src/app/store/reducers';

@Component({
  selector: 'app-case-surveillance-testing',
  templateUrl: './case-surveillance-testing.component.html',
  styleUrls: ['./case-surveillance-testing.component.scss'],
})
export class CaseSurveillanceTestingComponent implements OnInit {
  sectionType = SectionType.CASE_SURVEILLANCE;
  sectionOneConfig$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // this.sectionOneConfig$
    this.store.dispatch(
      loadAnalyticsData({ sectionType: SectionType.SECTION_ONE, periods: [] })
    );
  }

  updateData(data) {
    console.log({ data });
  }
}
