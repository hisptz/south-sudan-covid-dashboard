import { createFeatureSelector, createSelector } from '@ngrx/store';
import { configFeatureKey, ConfigState } from '../reducers/config.reducer';
import { map, flattenDeep } from 'lodash';
import { getRootState } from '../reducers';
import { SectionType } from 'src/app/core/models/dashboard.model';

const getConfigState = createFeatureSelector<ConfigState>(configFeatureKey);
export const getConfiguration = createSelector(
  getConfigState,
  (state) => state.configuration
);
export const getConfigurationLoadingStatus = createSelector(
  getConfigState,
  (state) => state.loading
);
export const getConfigurationLoadedStatus = createSelector(
  getConfigState,
  (state) => state.loading
);
export const getUserOrgUnitIds = createSelector(getConfigState, (state) => {
  return flattenDeep(
    map(state.userOrgUnits || [], (orgUnit) => {
      return orgUnit.id || [];
    })
  );
});
export const getUserOrgUnits = createSelector(getConfigState, (state) => {
  return state && state.userOrgUnits ? state.userOrgUnits : [];
});
export const getSectionOneConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig.section1 || {};
    }
    return data;
  }
);
export const getSectionTwoConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig.section2 || {};
    }
    return data;
  }
);
export const getSectionThreeConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig[SectionType.SECTION_THREE] || {};
    }
    return data;
  }
);
export const getSectionFourConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig[SectionType.SECTION_FOUR] || {};
    }
    return data;
  }
);
export const getSectioniveConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig[SectionType.SECTION_FIVE] || {};
    }
    return data;
  }
);
