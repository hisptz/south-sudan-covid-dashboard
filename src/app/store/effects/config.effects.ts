import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
  OnInitEffects,
} from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import {
  checkConfigurations,
  checkConfigurationsFailure,
  createConfiguration,
  getDefaultConfig,
  getDefaultConfigSuccess,
  getDefaultConfigFailure,
  createConfigurationSuccess,
  loadConfiguration,
  loadConfigurationSuccess,
  loadConfigurationFailure,
  updateConfigurationWithDefaultData,
  updateConfigurationWithDefaultDataSuccess,
  updateConfigurationWithDefaultDataFailure,
} from '../actions/config.actions';
import { mergeMap, map, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { State } from '../reducers';
import { AnalyticsDataService } from 'src/app/core/services/analytics-data.service';
import { SectionType } from 'src/app/core/models/dashboard.model';
import { getDefaultDashboardConfig } from 'src/app/core/helpers/get-default-dashboard-config.helper';
import { getConfiguration } from '../selectors/config.selectors';

@Injectable()
export class ConfigEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private configService: ConfigService,
    private analyticsDataService: AnalyticsDataService,
    private store: Store<State>
  ) {}
  @Effect()
  checkConfiguration(): Observable<Action> {
    return this.actions$.pipe(
      ofType(checkConfigurations),
      mergeMap(() =>
        this.configService.getConfigurations().pipe(
          map((data) => {
            return loadConfiguration();
          }),
          catchError((error: any) => {
            if (error && error.status && error.status === 404) {
              const config = getDefaultDashboardConfig();
              return of(createConfiguration({ data: config }));
            }
            return of(checkConfigurationsFailure({ error }));
          })
        )
      )
    );
  }

  // @Effect()
  // getAnalyticsData(): Observable<Action> {
  //   return this.actions$.pipe(
  //     ofType(getDefaultConfig),
  //     mergeMap((action) =>
  //       this.analyticsDataService.getDefaultConfig().pipe(
  //         map((data) => {
  //           return createConfiguration({ data });
  //         }),
  //         catchError((error: any) => {
  //           return of(getDefaultConfigFailure({ error }));
  //         })
  //       )
  //     )
  //   );
  // }
  @Effect()
  createConfiguration(): Observable<Action> {
    return this.actions$.pipe(
      ofType(createConfiguration),

      mergeMap((action) =>
        this.configService.createConfiguration(action.data).pipe(
          map((data) => {
            // this.store.dispatch(loadConfiguration());
            return updateConfigurationWithDefaultData({
              configuration: action?.data,
            });
          }),
          catchError((error: any) => {
            if (error && error.status && error.status === 404) {
              return of(getDefaultConfig());
            }
            return of(checkConfigurationsFailure({ error }));
          })
        )
      )
    );
  }
  @Effect()
  updateConfigurationWithDefaultData(): Observable<Action> {
    return this.actions$.pipe(
      ofType(updateConfigurationWithDefaultData),
      mergeMap((action) =>
        this.configService
          .updateConfigurationWithDefaultData(action.configuration)
          .pipe(
            map((data) => {
              console.log({ RESULT: data });
              this.store.dispatch(loadConfiguration());
              return updateConfigurationWithDefaultDataSuccess({ data });
            }),
            catchError((error: any) => {
              return of(updateConfigurationWithDefaultDataFailure({ error }));
            })
          )
      )
    );
  }

  // @Effect()
  // loadConfigurationSuccess(): Observable<Action> {
  //   return this.actions$.pipe(
  //     ofType(loadConfigurationSuccess),
  //     withLatestFrom(getConfiguration),
  //     tap(([action, configuration]) => {
  //       console.log({ action, configuration });
  //     })
  //   );
  // }

  @Effect()
  loadConfiguration(): Observable<Action> {
    return this.actions$.pipe(
      ofType(loadConfiguration),
      mergeMap((action) =>
        this.configService.getAllConfigurations().pipe(
          map((data) => {
            return loadConfigurationSuccess({ data });
          }),
          catchError((error: any) => {
            if (error && error.status && error.status === 404) {
              return of(getDefaultConfig());
            }
            return of(loadConfigurationFailure({ error }));
          })
        )
      )
    );
  }

  ngrxOnInitEffects() {
    return checkConfigurations();
  }
}
