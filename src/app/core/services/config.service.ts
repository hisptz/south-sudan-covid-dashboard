import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { throwError, from } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { SectionType } from '../models/dashboard.model';
@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http$: NgxDhis2HttpClientService) {}

  getConfigurations() {
    return this.http$
      .get(`dataStore/covid19Config`)
      .pipe(catchError((error) => throwError(error)));
  }
  getConfigurationSection(section: string) {
    return this.http$
      .get(`dataStore/covid19Config/${section}`)
      .pipe(catchError((error) => throwError(error)));
  }
  createConfiguration(data: any, sectionType: SectionType) {
    return this.http$
      .post(`dataStore/covid19Config/${sectionType}`, data)
      .pipe(catchError((error) => throwError(error)));
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
  getConfigurationSectionPromise(section: string): any {
    return new Promise((resolve, reject) => {
      this.getConfigurationSection(section)
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
  async getAllConfigurationsPromise() {
    let configs = {};
    const sections = await this.getConfigurationsPromise();
    if (sections && sections.length) {
      for (const section of sections) {
        try {
          const config = await this.getConfigurationSectionPromise(section);
          configs = { ...configs, [section]: config };
        } catch (e) {}
      }
    }
    return configs;
  }
  getAllConfigurations() {
    return from(this.getAllConfigurationsPromise());
  }
}
