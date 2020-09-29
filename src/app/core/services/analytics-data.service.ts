import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { catchError, take } from 'rxjs/operators';
import { throwError, from, Observable } from 'rxjs';
import { flattenDeep, map, findIndex, filter, find } from 'lodash';
import { getStringFromArray } from '../helpers/get-string-from-array.helper';
import { SectionType } from '../models/dashboard.model';
import {
  getIdsFromDx,
  getNamesFromDx,
} from '../helpers/get-ids-from-dx.helper';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsDataService {
  constructor(private http$: NgxDhis2HttpClientService) {}
  getAnalyticsDataValues(
    dx: string,
    orgUnit: string,
    period: string,
    sectionType: SectionType
  ) {
    let peURLType = '';
    let ouURLType = '';
    if (
      sectionType === SectionType.SECTION_TWO ||
      sectionType === SectionType.SECTION_THREE
    ) {
      peURLType = 'dimension';
      ouURLType = 'filter';
    } else if (
      sectionType === SectionType.SECTION_FOUR ||
      sectionType === SectionType.SECTION_FIVE
    ) {
      peURLType = 'filter';
      ouURLType = 'dimension';
    } else {
      peURLType = ouURLType = 'filter';
      ouURLType = 'dimension';
    }
    return this.http$
      .get(
        `analytics?dimension=dx:${dx}&${peURLType}=pe:${period}&${ouURLType}=ou:${orgUnit}`
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
    const ouIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'ou')
        : -1;

    const mappedData = this.getMappedDataFromRows(
      metaData,
      rows,
      dxIndex,
      valueIndex,
      periodIndex,
      ouIndex
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
    periodIndex: number,
    ouIndex
  ) {
    return flattenDeep(
      map(rows || [], (row) => {
        const id = row && row[dxIndex] ? row[dxIndex] : '';
        const value = row && row[valueIndex] ? row[valueIndex] : '';
        const periodID = row && row[periodIndex] ? row[periodIndex] : '';
        const orgUnit = row && row[ouIndex] ? row[ouIndex] : '';

        const { items } = metaData;
        const name = items && items[id] && items[id].name ? items[id].name : '';
        const period =
          items && items[periodID] && items[periodID].name
            ? items[periodID].name
            : '';

        return { ...{}, id, name, value, period, orgUnit } || [];
      })
    );
  }
  getLabPeriods(periodDimensions: Array<any>, items) {
    return map(periodDimensions || [], (dimension) => {
      const period =
        items && items[dimension] && items[dimension].name
          ? items[dimension].name
          : '';
      return period;
    });
  }
  getLabMappedDataValues(
    dxDimensions: Array<any>,
    periodDimensions: Array<any>,
    items,
    rows: Array<any>,
    dxIndex,
    periodIndex,
    valueIndex
  ) {
    let dataValues = [];
    if (dxDimensions && dxDimensions.length) {
      for (const dxDim of dxDimensions) {
        let obj = {};
        let values = [];
        const name =
          items && items[dxDim] && items[dxDim].name ? items[dxDim].name : '';
        if (periodDimensions && periodDimensions.length) {
          for (const peDim of periodDimensions) {
            let value = 0;
            if (rows && rows.length) {
              for (const row of rows) {
                if (name === row[dxIndex] && peDim === row[periodIndex]) {
                  value = row && row[valueIndex] ? row[valueIndex] : 0;

                  value =
                    typeof value === 'string' ? parseInt(value, 10) : value;
                }
              }
            }
            values = [...values, value];
          }
        }
        obj = { ...{}, name, data: values };
        dataValues = [...dataValues, obj];
      }
    }
    return dataValues;
  }
  getLabMappedDataFromRows(
    metaData: any,
    rows: any[],
    dxIndex: number,
    valueIndex: number,
    periodIndex: number,
    ouIndex
  ) {
    const dimensions =
      metaData && metaData.dimensions ? metaData.dimensions : null;
    const periodDimensions = dimensions && dimensions.pe ? dimensions.pe : [];
    const dxDimensions =
      dimensions && dimensions.bujqZ6Dqn4m ? dimensions.bujqZ6Dqn4m : [];
    const items = metaData && metaData.items ? metaData.items : null;

    const periods = this.getLabPeriods(periodDimensions, items);
    const data = this.getLabMappedDataValues(
      dxDimensions,
      periodDimensions,
      items,
      rows,
      dxIndex,
      periodIndex,
      valueIndex
    );

    return { ...{}, periods, data };
  } // End of getLabMappedDataFromRows
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
        const dx = [];
        const xAxis = [];
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
            dx.unshift(value);

            mappedItem && mappedItem.period
              ? xAxis.unshift(mappedItem.period)
              : xAxis.unshift('Date');
            sanitizedItem = { ...sanitizedItem, [dxItem.position]: dx, xAxis };
          }
          sanitizedData = { ...sanitizedData, ...sanitizedItem };
        }
      }
      return sanitizedData;
    }
    return mappedData;
  }

  getLabRequestedAnalyticsDataValues(
    labArr: string[],
    orgUnits: any[],
    periods: any[],
    sectionType: SectionType
  ): Observable<any> {
    return from(
      this.getLabMappedSectionData(labArr, orgUnits, periods, sectionType)
    );
  }

  async getLabMappedSectionData(
    labs,
    orgUnits: any[],
    periods: any[],
    sectionType: SectionType
  ) {
    const dxArr = getNamesFromDx(labs);

    const response = await this.getLabRequestedAnalyticsDataValuesPromise(
      dxArr,
      orgUnits,
      periods,
      sectionType
    );

    const { headers, metaData, rows } = response;
    const dxIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'bujqZ6Dqn4m')
        : -1;
    const periodIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'pe')
        : -1;
    const valueIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'value')
        : -1;
    const ouIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'ou')
        : -1;

    const mappedData = this.getLabMappedDataFromRows(
      metaData,
      rows,
      dxIndex,
      valueIndex,
      periodIndex,
      ouIndex
    );
    return mappedData;
  }

  getLabAnalyticsDataValues(
    dx: string,
    orgUnit: string,
    period: string,
    sectionType: SectionType
  ) {
    return this.http$
      .get(
        `analytics/events/aggregate/uYjxkTbwRNf.json?dimension=bujqZ6Dqn4m:IN:${dx}&dimension=pe:${period}&filter=ou:${orgUnit}`
      )
      .pipe(catchError((error) => throwError(error)));
  }
  getLabRequestedAnalyticsDataValuesPromise(
    dxArr: string[],
    orgUnits: any[],
    periods: any[],
    sectionType: SectionType
  ): any {
    const dxArrString = getStringFromArray(dxArr);
    const orgUnitsString = getStringFromArray(orgUnits);
    const periodsString = getStringFromArray(periods);
    return new Promise((resolve, reject) => {
      this.getLabAnalyticsDataValues(
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

  // TODO: Remove hard coded values

  getTypeOfTestsAnalytics() {
    return this.http$
      .get(
        `analytics/events/aggregate/uYjxkTbwRNf.json?dimension=D0RBm3alWd9:IN:ELISA;GeneXpert;PCR;RDT&dimension=pe:LAST_12_WEEKS&filter=ou:he6RdNPCKhY&stage=iR8O4hSLHnu&displayProperty=NAME&outputType=EVENT&sortOrder=DESC`
      )
      .pipe(catchError((error) => throwError(error)));
  }
  getTypeOfTestsAnalyticsPromise(): any {
    return new Promise((resolve, reject) => {
      this.getTypeOfTestsAnalytics()
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

  async getRequestedTypeOfTestsPromise() {
    const response = await this.getTypeOfTestsAnalyticsPromise();
    const { headers, metaData, rows } = response;
    const dxIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'D0RBm3alWd9')
        : -1;
    const periodIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'pe')
        : -1;
    const valueIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'value')
        : -1;
    const ouIndex =
      headers && headers.length
        ? headers.findIndex((item) => item.name === 'ou')
        : -1;

    const mappedData = this.getTypeOfTestsMappedDataFromRows(
      metaData,
      rows,
      dxIndex,
      valueIndex,
      periodIndex,
      ouIndex
    );
    return mappedData;
  }
  getTypeOfTestsMappedDataFromRows(
    metaData: any,
    rows: any[],
    dxIndex: number,
    valueIndex: number,
    periodIndex: number,
    ouIndex
  ) {
    const dimensions =
      metaData && metaData.dimensions ? metaData.dimensions : null;
    const periodDimensions = dimensions && dimensions.pe ? dimensions.pe : [];
    const dxDimensions =
      dimensions && dimensions.D0RBm3alWd9 ? dimensions.D0RBm3alWd9 : [];
    const items = metaData && metaData.items ? metaData.items : null;

    const periods = this.getLabPeriods(periodDimensions, items);
    const data = this.getLabMappedDataValues(
      dxDimensions,
      periodDimensions,
      items,
      rows,
      dxIndex,
      periodIndex,
      valueIndex
    );

    return { ...{}, periods, data };
  } // End of getLabMappedDataFromRows
  getRequestedTypeOfTests(): Observable<any> {
    return from(this.getRequestedTypeOfTestsPromise());
  }
}
