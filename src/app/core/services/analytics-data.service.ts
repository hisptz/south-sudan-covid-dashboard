import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { catchError, take } from 'rxjs/operators';
import { throwError, from, Observable } from 'rxjs';
import { flattenDeep, map, findIndex, filter, find } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { getStringFromArray } from '../helpers/get-string-from-array.helper';
import { SectionType } from '../models/dashboard.model';
import { getIdsFromDx } from '../helpers/get-ids-from-dx.helper';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsDataService {
  constructor(
    private http$: NgxDhis2HttpClientService,
    private httpClient: HttpClient
  ) {}
  getAnalyticsDataValues(
    dx: string,
    orgUnit: string,
    period: string,
    sectionType: SectionType
  ) {
    let peURLType = '';
    if (
      sectionType === SectionType.SECTION_TWO ||
      sectionType === SectionType.SECTION_THREE
    ) {
      peURLType = 'dimension';
    } else {
      peURLType = 'filter';
    }
    return this.http$
      .get(
        `analytics?dimension=dx:${dx}&${peURLType}=pe:${period}&filter=ou:${orgUnit}`
      )
      .pipe(catchError((error) => throwError(error)));
  }
  getRequestedAnalyticsDataValuesPromise(
    dxArr: string[],
    orgUnits: any[],
    periods: any[],
    sectionType: SectionType
  ): any {
    const dxArrString = getStringFromArray(dxArr);
    const orgUnitsString = getStringFromArray(orgUnits);
    const periodsString = getStringFromArray(periods);
    return new Promise((resolve, reject) => {
      this.getAnalyticsDataValues(
        dxArrString,
        orgUnitsString,
        periodsString,
        sectionType
      )
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
  getRequestedAnalyticsDataValues(
    dxArr: string[],
    orgUnits: any[],
    periods: any[],
    sectionType: SectionType
  ): Observable<any> {
    console.log({ dxArr, orgUnits, periods });
    return from(
      this.getMappedSectionData(dxArr, orgUnits, periods, sectionType)
    );
  }
  async getMappedSectionData(
    configuration: any,
    orgUnits: any[],
    periods: any[],
    sectionType: SectionType
  ) {
    const dx =
      configuration &&
      configuration[sectionType] &&
      configuration[sectionType].dx
        ? configuration[sectionType].dx
        : [];
    const dxArr = getIdsFromDx(dx);
    const response = await this.getRequestedAnalyticsDataValuesPromise(
      dxArr,
      orgUnits,
      periods,
      sectionType
    );
    console.log({ serverResponse: response });
    const { headers, metaData, rows } = response;
    const dxIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'dx')
        : -1;
    const periodIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'pe')
        : -1;
    const valueIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'value')
        : -1;

    const mappedData = this.getMappedDataFromRows(
      metaData,
      rows,
      dxIndex,
      valueIndex,
      periodIndex
    );
    const sanitizedMappedData = this.getSanitizedMappedData(
      configuration,
      mappedData,
      sectionType
    );
    return sanitizedMappedData;
  }

  getMappedDataFromRows(
    metaData: any,
    rows: any[],
    dxIndex: number,
    valueIndex: number,
    periodIndex: number
  ) {
    return flattenDeep(
      map(rows || [], (row) => {
        const id = row && row[dxIndex] ? row[dxIndex] : '';
        const value = row && row[valueIndex] ? row[valueIndex] : '';
        const periodID = row && row[periodIndex] ? row[periodIndex] : '';

        const { items } = metaData;
        const name = items && items[id] && items[id].name ? items[id].name : '';
        const period =
          items && items[periodID] && items[periodID].name
            ? items[periodID].name
            : '';

        return { ...{}, id, name, value, period } || [];
      })
    );
  }
  getSanitizedMappedData(
    configuration: any,
    mappedData: any,
    sectionType: SectionType
  ) {
    switch (sectionType) {
      case SectionType.SECTION_ONE:
        return mappedData;
      case SectionType.SECTION_TWO:
      case SectionType.SECTION_THREE:
        const sanitizedMappedData = this.getSectionTwoSanitizedData(
          configuration,
          mappedData,
          sectionType
        );
        return sanitizedMappedData;
      default:
        return mappedData;
    }
  }
  getSectionTwoSanitizedData(
    configuration: any,
    mappedData: any,
    sectionType: SectionType
  ) {
    const sectionTwoConfig =
      configuration && configuration[sectionType]
        ? configuration[sectionType]
        : {};
    if (
      sectionTwoConfig &&
      sectionTwoConfig.dx &&
      sectionTwoConfig.dx.length &&
      mappedData &&
      mappedData.length
    ) {
      let sanitizedData = {};
      for (const dxItem of sectionTwoConfig.dx) {
        let sanitizedItem = {};
        let dx = [];
        let xAxis = [];
        for (const mappedItem of mappedData) {
          if (
            mappedItem &&
            dxItem &&
            mappedItem.id &&
            dxItem.id &&
            dxItem.position &&
            mappedItem.id === dxItem.id
          ) {
            let value = mappedItem && mappedItem.value ? mappedItem.value : '0';
            value = parseInt(value, 10);
            dx = [...dx, value];
            xAxis =
              mappedItem && mappedItem.period
                ? [...xAxis, mappedItem.period]
                : [...xAxis, 'Date'];
            sanitizedItem = { ...sanitizedItem, [dxItem.position]: dx, xAxis };
          }
          sanitizedData = { ...sanitizedData, ...sanitizedItem };
        }
      }
      return sanitizedData;
    }
    return mappedData;
  }
}
