import * as fromAnalytic from './analytic.actions';

describe('loadAnalytics', () => {
  it('should return an action', () => {
    expect(fromAnalytic.loadAnalytics().type).toBe('[Analytic] Load Analytics');
  });
});
