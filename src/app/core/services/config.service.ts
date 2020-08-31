import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http$: NgxDhis2HttpClientService) { }

  getConfigurations() {
    return this.http$
      .get(`/api/dataStore/covid19Config`)
      .pipe(catchError((error) => throwError(error)));
  }
  createConfiguration(data: any) {
    return this.http$
    .post(`/api/dataStore/covid19Config`, data)
    .pipe(catchError((error) => throwError(error)));
  }
}
