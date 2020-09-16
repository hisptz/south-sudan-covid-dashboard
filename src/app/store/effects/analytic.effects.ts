import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { getIdsFromDx } from 'src/app/core/helpers/get-ids-from-dx.helper';
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
      withLatestFrom(
        this.store.select(getUserOrgUnits),
        this.store.select(getConfiguration)
      ),
      mergeMap(([action, orgUnits, configuration]) => {
        const dxArr = configuration[action?.sectionType].dx || [];
        const dx = getIdsFromDx(dxArr);
        return this.analyticsService
          .getRequestedAnalyticsDataValues(dx, orgUnits, action.periods)
          .pipe(
            map((data) => {
              console.log({ response: data });
              return loadAnalyticsDataSuccess({ sectionType:action.sectionType, data });
            }),
            catchError((error: any) => {
              console.log({error})
              return of(loadAnalyticsDataFailure({ error }));
            })
          );
      })
    );
  }
}
