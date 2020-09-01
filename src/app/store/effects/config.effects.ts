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
} from '../actions/config.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { State } from '../reducers';
import { AnalyticsDataService } from 'src/app/core/services/analytics-data.service';
import { SectionType } from 'src/app/core/models/dashboard.model';

@Injectable()
export class ConfigEffects implements OnInitEffects{
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
              return of(getDefaultConfig());
            }
            return of(checkConfigurationsFailure({ error }));
          })
        )
      )
    );
  }

  @Effect()
  getAnalyticsData(): Observable<Action> {
    return this.actions$.pipe(
      ofType(getDefaultConfig),
      mergeMap((action) =>
        this.analyticsDataService.getDefaultConfig().pipe(
          map((data) => {
            return createConfiguration({ data });
          }),
          catchError((error: any) => {
            return of(getDefaultConfigFailure({ error }));
          })
        )
      )
    );
  }
  @Effect()
  createConfiguration(): Observable<Action> {
    return this.actions$.pipe(
      ofType(createConfiguration),
      mergeMap((action) =>
        this.configService
          .createConfiguration(action.data, SectionType.CASE)
          .pipe(
            map((data) => {
             
              return loadConfiguration();
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
  loadConfiguration(): Observable<Action> {
    return this.actions$.pipe(
      ofType(loadConfiguration),
      mergeMap((action) =>
        this.configService
          .getAllConfigurations()
          .pipe(
            map((data) => {
              console.log({ RESULT: data });
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

// mergeMap(() =>
// this.configService.getConfigurations().pipe(
//   map((data) => {
//      return of(createConfiguration({ data}))
//   }),
//   catchError((error) => {

//     return of(checkConfigurationsFailure({ error }));
//   })
// )
// )
// );
