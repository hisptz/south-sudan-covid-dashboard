import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { MAP_GEO } from './map-geo';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { getConfiguration } from 'src/app/store/selectors/config.selectors';

@Component({
  selector: 'app-map-sectction',
  templateUrl: './map-sectction.component.html',
  styleUrls: ['./map-sectction.component.scss'],
})
export class MapSectctionComponent implements OnInit, AfterViewInit {
  mapGeo: any;

  currentChart: any;
  currentDevice: string;


  config$: Observable<any>;
  sectionFiveAnalytics$: Observable<any>;
  sectionFiveConfig$: Observable<any>;
  sectionLoadingStatus$: Observable<any>;
  configLoadingStatus$: Observable<any>;
  userOrgUnits$: Observable<Array<any>>;

  constructor(private store: Store<State>) {
    this.mapGeo = MAP_GEO.ss;
  }

  ngOnInit(): void {
    // this.config$ = this.store.select(getConfiguration);
    // this.sectionFiveConfig$ = this.store.select(getSectionFiveConfiguration);
    // this.sectionLoadingStatus$ = this.store.select(getSectionFiveLoadingStatus);
    // this.userOrgUnits$ = this.store.pipe(select(getUserOrgUnits));
    // this.configLoadingStatus$ = this.store.select(
    //   getConfigurationLoadingStatus
    // );
    // this.sectionFourAnalytics$ = this.store.pipe(
    //   select(getSectionFourAnalyticsData)
    // );
    // this.config$.subscribe((conf) => {
    //   if (conf) {
    //     this.store.dispatch(
    //       loadAnalyticsData({
    //         sectionType: SectionType.SECTION_FOUR,
    //         periods: ['LAST_12_MONTHS'],
    //       })
    //     );
    //   }
    // });
  }

  ngAfterViewInit() {
    this.drawMap();
  }

  drawMap() {
    const container = document.createElement('div');
    const chartHolder = document.getElementById('mapVisualization');
    chartHolder.appendChild(container);

    this.currentChart = Highcharts.mapChart({
      chart: {
        map: this.mapGeo,
        renderTo: container,
      },
      title: {
        text: 'MAP DISPLAYING GEOGRAPHICAL DISTRIBUTION OF CONFIRMED CASES',
      },
      subtitle: {
        text: 'South Sudan',
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'top',
        },
      },
      colorAxis: {
        min: 0,
        maxColor: '#80d8ff',
        minColor: '#0091ea',
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: undefined,
          data: this.getRandomData(),
          name: 'death counts',
          states: {
            hover: {
              color: '#FFFFFF',
            },
          },
          dataLabels: {
            enabled: true,
            format: '{point.name} ({point.value})',
          },
        },
      ],
    });
  }

  getRandomData() {
    const mapData = [];
    for (const feature of this.mapGeo.features) {
      const key = feature.properties['hc-key'];
      const value = _.random(100, 500);
      mapData.push([key, value]);
    }
    return mapData;
  }
}
