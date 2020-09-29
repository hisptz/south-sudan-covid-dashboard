import { createFeatureSelector, createSelector } from '@ngrx/store';
import { configFeatureKey, ConfigState } from '../reducers/config.reducer';
import { map, flattenDeep, values, mapKeys } from 'lodash';
import { getRootState } from '../reducers';
import { SectionType } from 'src/app/core/models/dashboard.model';

const getConfigState = createFeatureSelector<ConfigState>(configFeatureKey);
export const getConfiguration = createSelector(
  getConfigState,
  (state) => state.configuration
);
export const getConfigurationList = createSelector(getConfigState, (state) => {
  let arr = [];
  const configKeys =
    state && state.configuration ? Object.keys(state.configuration) || [] : [];
  if (configKeys && configKeys.length) {
    for (const key of configKeys) {
      const newConfig =
        state && state.configuration && state.configuration[key]
          ? { ...state.configuration[key], section: key }
          : [];
      arr = [...arr, newConfig];
      arr = flattenDeep(arr);
    }
  }
  return arr;
});
export const getConfigurationLoadingStatus = createSelector(
  getConfigState,
  (state) => state.loading
);
export const getConfigurationLoadedStatus = createSelector(
  getConfigState,
  (state) => state.loaded
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
export const getLaboratories = createSelector(getConfigState, (state) => {
  return state && state.laboratories ? state.laboratories : [];
});
export const getAllUserOrgUnits = createSelector(
  getConfigState,
  getUserOrgUnits,
  (state, orgUnits) => {
    let newOrgUnits = [];
    if (orgUnits && orgUnits.length) {
      for (const orgUnit of orgUnits) {
        newOrgUnits.push(orgUnit);
        if (orgUnit && orgUnit.children) {
          newOrgUnits = [...newOrgUnits, ...orgUnit.children];
        }
      }
    }

    return newOrgUnits;
  }
);
export const getLowerLevelUserOrgUnits = createSelector(
  getConfigState,
  getAllUserOrgUnits,
  (state, orgUnits) => {
    let newOrgUnits = [];
    if (orgUnits && orgUnits.length) {
      for (const orgUnit of orgUnits) {
        if (orgUnit && !orgUnit.children) {
          newOrgUnits = [...newOrgUnits, orgUnit];
        }
      }
    }
    return newOrgUnits;
  }
);
export const getLowerLevelUserOrgUnitIds = createSelector(
  getConfigState,
  getLowerLevelUserOrgUnits,
  (state, orgUnits) => {
    return flattenDeep(
      map(orgUnits || [], (orgUnit) => {
        return orgUnit.id || [];
      })
    );
  }
);
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
export const getSectionFiveConfiguration = createSelector(
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
export const getSectionSixConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig[SectionType.SECTION_SIX] || {};
    }
    return data;
  }
);
export const getSectionSevenConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig[SectionType.SECTION_SEVEN] || {};
    }
    return data;
  }
);
export const getSectionEightConfiguration = createSelector(
  getConfigState,
  (state) => {
    let data = {};
    if (state && state.configuration) {
      const sectionConfig = state.configuration;
      data = sectionConfig[SectionType.SECTION_EIGHT] || {};
    }
    return data;
  }
);
