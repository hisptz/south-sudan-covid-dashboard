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
} from '../actions/config.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config.service';
import { State } from '../reducers';

@Injectable()
export class ConfigEffects implements OnInitEffects {
  constructor(
    private actions$: Actions,
    private configService: ConfigService,
    private store: Store<State>
  ) {}
  @Effect()
  checkConfiguration(): Observable<Action> {
    return this.actions$.pipe(
      ofType(checkConfigurations),
      mergeMap(() =>
        this.configService.getConfigurations().pipe(
          map((data) => {
            console.log({ data });
            return createConfiguration({ data });
          }),
          catchError((error: any) => {
            if (error && error.status && error.status === 404) {
              console.log({ error });
            }
            return of(checkConfigurationsFailure({ error }));
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
