import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { MAP_GEO } from './map-geo';
import * as _ from 'lodash';

@Component({
  selector: 'app-map-visualization',
  templateUrl: './map-visualization.component.html',
  styleUrls: ['./map-visualization.component.scss'],
})
export class MapVisualizationComponent implements OnInit, AfterViewInit {
  mapGeo: any;
  mappingOrgUnits: any;
  @Input() mapData = [];
  @Input() orgUnits = [];
  @Input() orgUnitIds = [];
  @Input() analyticsData = [];
  @Input() mapTitle = '';

  currentChart: any;
  currentDevice: string;
  constructor() {
    this.mapGeo = MAP_GEO.ss;
    this.mappingOrgUnits = MAP_GEO.ssOrgUnits;
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.analyticsData) {
      this.drawMap();
    }
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
        text: this.mapTitle,
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
          name: 'Confirmed cases',
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
      const value = this.getAnalyticsValue(key);
     
      mapData.push([key, value]);
    }
    return mapData;
  }
  getAnalyticsValue(key) {
    const mapConfig =
      this.mappingOrgUnits && this.mappingOrgUnits.mapConfig
        ? this.mappingOrgUnits.mapConfig
        : [];
    const mappingObj = _.find(
      mapConfig || [],
      (config) => config['hc-key'] === key
    );
    const orgUnitId =
      mappingObj && mappingObj.orgUnitId ? mappingObj.orgUnitId : null;
    const analyticsObj = orgUnitId
      ? _.find(this.analyticsData || [], (item) => item.orgUnit === orgUnitId)
      : null;
    console.log({ analyticsObj });  
    const value = analyticsObj && analyticsObj.value ? analyticsObj.value : 0;
    return value ? value : 0;
  }
}
