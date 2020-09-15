import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { AnalyticEffects } from './analytic.effects';

describe('AnalyticEffects', () => {
  let actions$: Observable<any>;
  let effects: AnalyticEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnalyticEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AnalyticEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
