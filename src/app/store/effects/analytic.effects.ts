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
  loadMapAnalyticsData,
} from '../actions/analytic.actions';
import { State } from '../reducers';
import {
  getConfiguration,
  getLowerLevelUserOrgUnitIds,
  getUserOrgUnitIds,
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
        this.store.select(getUserOrgUnitIds),
        this.store.select(getConfiguration)
      ),
      mergeMap(([action, orgUnits, configuration]) => {
        return this.analyticsService
          .getRequestedAnalyticsDataValues(
            configuration,
            orgUnits,
            action.periods,
            action.sectionType
          )
          .pipe(
            map((data) => {
              return loadAnalyticsDataSuccess({
                sectionType: action.sectionType,
                data,
              });
            }),
            catchError((error: any) => {
              console.log({ error });
              return of(loadAnalyticsDataFailure({ error }));
            })
          );
      })
    );
  }

  @Effect()
  loadMapAnalyticsData(): Observable<Action> {
    return this.actions$.pipe(
      ofType(loadMapAnalyticsData),
      withLatestFrom(
        this.store.select(getLowerLevelUserOrgUnitIds),
        this.store.select(getConfiguration)
      ),
      mergeMap(([action, orgUnits, configuration]) => {
        return this.analyticsService
          .getRequestedAnalyticsDataValues(
            configuration,
            orgUnits,
            action.periods,
            action.sectionType
          )
          .pipe(
            map((data) => {
              return loadAnalyticsDataSuccess({
                sectionType: action.sectionType,
                data,
              });
            }),
            catchError((error: any) => {
              return of(loadAnalyticsDataFailure({ error }));
            })
          );
      })
    );
  }
}
