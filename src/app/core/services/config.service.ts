import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { throwError, from } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { JSON_FILES } from '../helpers/json-files';
import { map, flattenDeep } from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http$: NgxDhis2HttpClientService) {}

  getConfigurations() {
    return this.http$
      .get(`dataStore/covid19Dashboard/config`)
      .pipe(catchError((error) => throwError(error)));
  }
  getProgramIndicators() {
    return this.http$
      .get(`programIndicators.json?paging=false`)
      .pipe(catchError((error) => throwError(error)));
  }
  getDataElementWithOptionSet(dataElementId) {
    return this.http$
      .get(
        `dataElements/${dataElementId}.json?fields=id,name,optionSet[id,name,options[id,name]]`
      )
      .pipe(catchError((error) => throwError(error)));
  }
  getUserData() {
    return this.http$
      .get(`me?fields=id,name,organisationUnits[id,name, children[id, name]]`)
      .pipe(catchError((error) => throwError(error)));
  }
  getConfigurationSection() {
    return this.http$
      .get(`dataStore/covid19Dashboard/config`)
      .pipe(catchError((error) => throwError(error)));
  }
  createConfiguration(data: any) {
    return this.http$
      .post(`dataStore/covid19Dashboard/config`, data)
      .pipe(catchError((error) => throwError(error)));
  }
  updateConfiguration(data: any) {
    return this.http$
      .put(`dataStore/covid19Dashboard/config`, data)
      .pipe(catchError((error) => throwError(error)));
  }
  updateConfigurationPromise(config: any): any {
    return new Promise((resolve, reject) => {
      this.updateConfiguration(config)
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  getDataElementWithOptionSetPromise(dataElementId): any {
    return new Promise((resolve, reject) => {
      this.getDataElementWithOptionSet(dataElementId)
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  getConfigurationsPromise(): any {
    return new Promise((resolve, reject) => {
      this.getConfigurations()
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  getProgramIndicatorsPromise(): any {
    return new Promise((resolve, reject) => {
      this.getProgramIndicators()
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  getUserDataPromise(): any {
    return new Promise((resolve, reject) => {
      this.getUserData()
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  getConfigurationSectionPromise(): any {
    return new Promise((resolve, reject) => {
      this.getConfigurationSection()
        .pipe(take(1))
        .subscribe(
          (data) => {
            resolve(data);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  async getAllConfigurationsPromise(dataElementId = 'bujqZ6Dqn4m') {
    try {
      const config = await this.getConfigurationSectionPromise();
      const user = await this.getUserDataPromise();
      const userId = user && user.id ? user.id : '';
      const orgUnits =
        user && user.organisationUnits ? user.organisationUnits : [];
      const userName = user && user.name ? user.name : '';
      const laboratories = await this.getLaboratoriesListPromise(dataElementId);
      const programIndicatorsResponse = await this.getProgramIndicatorsPromise();
      const programIndicators =
        programIndicatorsResponse && programIndicatorsResponse.programIndicators
          ? programIndicatorsResponse.programIndicators
          : [];
      return {
        config,
        userId,
        orgUnits,
        userName,
        laboratories,
        programIndicators,
      };
    } catch (e) {
      throw new Error('Failed to load configurations');
    }
  }
  getAllConfigurations() {
    return from(this.getAllConfigurationsPromise());
  }
  async getLaboratoriesListPromise(dataElementId) {
    const dataElement = await this.getDataElementWithOptionSetPromise(
      dataElementId
    );
    const optionSet =
      dataElement && dataElement.optionSet ? dataElement.optionSet : null;
    const laboratories =
      optionSet && optionSet.options ? optionSet.options : [];
    return laboratories;
  }

  // getDefaultDataConfiguration() {
  //   return this.httpClient$
  //     .get(`assets/json/default-config.json`)
  //     .pipe(catchError((error) => throwError(error)));
  // }
  // getDefaultConfigurationPromise(): any {
  //   return new Promise((resolve, reject) => {
  //     this.getDefaultDataConfiguration()
  //       .pipe(take(1))
  //       .subscribe(
  //         (data) => {
  //           resolve(data);
  //         },
  //         (error) => {
  //           reject(error);
  //         }
  //       );
  //   });
  // }
  async updateConfigurationWithDefaultDataPromise(configuration) {
    let config = { ...{}, ...configuration };
    const defaultData = JSON_FILES.defaultDataConfig;
    let updateConfigResponse = null;
    if (config) {
      const configKeys = Object.keys(config);

      for (const key of configKeys) {
        const dx = flattenDeep(
          map(defaultData[key] || [], (dataKey, i) => {
            const configDx = config[key].dx;
            const id = dataKey.id || '';
            const percentageDx = dataKey.percentageDx || '';
            return { ...configDx[i], id, percentageDx } || [];
          })
        );
        const updatedConfig = { [key]: { ...config[key], dx } };
        config = { ...config, ...updatedConfig };
      }

      updateConfigResponse = await this.updateConfigurationPromise(config);
    }
    return updateConfigResponse;
  }
  updateConfigurationWithDefaultData(configuration: any) {
    return from(this.updateConfigurationWithDefaultDataPromise(configuration));
  }
}
