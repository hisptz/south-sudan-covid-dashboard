import { createFeatureSelector, createSelector } from '@ngrx/store';
import { configFeatureKey, ConfigState } from '../reducers/config.reducer';
import { map, flattenDeep } from 'lodash';
import { getRootState } from '../reducers';

// const getConfigState = createFeatureSelector<ConfigState>(configFeatureKey);
// export const getConfiguration = createSelector(
//   getConfigState,
//   (state) => state.configuration || null
// );
export const getUserOrgUnits = createSelector(getRootState, (state) => {
  console.log({ data: state.configs });
  return flattenDeep(
    map([], (orgUnit) => {
      return orgUnit.id || [];
    })
  );
}); //
// export const getSectionOneConfiguration = createSelector(
//   getConfigState,
//   (state) => {
//     let data = {};
//     if (state && state.configuration) {
//       const sectionConfig = state.configuration;
//       data = sectionConfig.section1 || {};
//     }
//     return data;
//   }
// );
// export const getSectionTwoConfiguration = createSelector(
//   getConfigState,
//   (state) => {
//     let data = {};
//     if (state && state.configuration) {
//       const sectionConfig = state.configuration;
//       data = sectionConfig.section2 || {};
//     }
//     return data;
//   }
// );
