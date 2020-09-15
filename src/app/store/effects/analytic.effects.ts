import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { AnalyticsDataService } from 'src/app/core/services/analytics-data.service';
import {
  loadAnalyticsData,
  loadAnalyticsDataFailure,
  loadAnalyticsDataSuccess,
} from '../actions/analytic.actions';
import { State } from '../reducers';
import {
  getConfiguration,
  getUserOrgUnits,
} from '../selectors/config.selectors';

@Injectable()
export class AnalyticEffects {
  constructor(
    private actions$: Actions,
    private analyticsService: AnalyticsDataService,
    private store: Store<State>
  ) {}

  @Effect()
  loadAnalyticsData(): Observable<Action> {
    return this.actions$.pipe(
      ofType(loadAnalyticsData),
      withLatestFrom(getUserOrgUnits),
      mergeMap(([action, orgUnits]) => {
       // const dx = configuration[action?.sectionType];
        return this.analyticsService
          .getRequestedAnalyticsDataValues(
            [],
            orgUnits,
            ['2020Q1']
          )
          .pipe(
            map((data) => {
              return loadAnalyticsDataSuccess({ data });
            }),
            catchError((error: any) => {
              return of(loadAnalyticsDataFailure({ error }));
            })
          );
      })
    );
  }
}
