import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { catchError, take } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
import { flattenDeep, map, findIndex } from 'lodash';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsDataService {
  constructor(
    private http$: NgxDhis2HttpClientService,
    private httpClient: HttpClient
  ) {}
  getAnalyticsDataValues(id: string, relativePeriod) {
    return this.http$
      .get(
        `analytics?dimension=dx:${id}&filter=pe:${relativePeriod}&filter=ou:he6RdNPCKhY`
      )
      .pipe(catchError((error) => throwError(error)));
  }
  getAnalyticsDataValuesPromise(id: string, relativePeriod = '2020Q1'): any {
    return new Promise((resolve, reject) => {
      this.getAnalyticsDataValues(id, relativePeriod)
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
  getDefaultConfiguration() {
    return this.httpClient
      .get(`assets/json/default-config.json`)
      .pipe(catchError((error) => throwError(error)));
  }
  getDefaultConfigurationPromise(): any {
    return new Promise((resolve, reject) => {
      this.getDefaultConfiguration()
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

  async createConfigItem(dataId, relativePeriod = '2020Q1') {
    const analyticsData = dataId
      ? await this.getAnalyticsDataValuesPromise(dataId, relativePeriod)
      : null;
    const configItemArr = [];
    const { headers, metaData, rows } = analyticsData;
    const dxIndex = findIndex(headers || [], (header) => header.name === 'dx');
    const valueIndex = findIndex(
      headers || [],
      (header) => header.name === 'value'
    );
    if (rows && rows.length) {
      for (let i = 0; i < rows.length; i++) {
        let rowItem = { id: '', name: '', value: '' };
        const id = rows[i][dxIndex] ? rows[i][dxIndex] : '';
        const name =
          metaData && metaData.items
            ? metaData.items[rows[i][dxIndex]].name || ''
            : '';
        const value = rows[i][valueIndex] ? rows[i][valueIndex] : '';
        rowItem = { ...rowItem, id, name, value };
        configItemArr.push(rowItem);
      }
    }
    return configItemArr;
  }

  async getAllAnalyticsDataValuesPromise() {
    try {
      const config = await this.getDefaultConfigurationPromise();
      let dataValues = [];
      if (config) {
        const configValues = Object.keys(config) || [];
        let valuesArr = [];
        if (configValues && configValues.length) {
          for (const configValue of configValues) {
            valuesArr = [...valuesArr, ...config[configValue]]; // TODO Check for duplicates
          }
          if (valuesArr && valuesArr.length) {
            for (const value of valuesArr) {
              const configItem = await this.createConfigItem(value?.id);
              dataValues = [...dataValues, ...configItem];
            }
          }
        }
      }
      return dataValues;
    } catch (e) {
      return [];
    }

  
  }
  getDefaultConfig() {
    return from(this.getAllAnalyticsDataValuesPromise());
  }
}
