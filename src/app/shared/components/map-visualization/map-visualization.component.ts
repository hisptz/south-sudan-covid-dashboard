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
    this.mappingOrgUnits = MAP_GEO.ssOrgUnits;
    this.mapGeo = this.getCustomMapData();
  }

  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.analyticsData && this.mapGeo) {
      this.drawMap();
    }
  }

  drawMap() {
    if (this.mapGeo) {
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
          max: 20,
          minColor: '#F6F7F7',
          maxColor: '#DE001E',
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
  }
  getCustomMapData() {
    let mapData = MAP_GEO.ss;
    const features = [];
    if (mapData && mapData.features && mapData.features.length) {
      for (const feature of mapData.features) {
        const key = feature.properties['hc-key'];
        const name = this.getLocationValidName(key);
        const properties =
          feature && feature.properties
            ? { ...feature.properties, 'woe-name': name, name }
            : features;
        const newFeature = { ...feature, properties };
        features.push(newFeature);
      }
     // console.log({ geo: MAP_GEO.ss });
      mapData = { ...mapData, features };
    }

    return mapData;
  }
  getRandomData() {
    const mapData = [];
    if (this.mapGeo && this.mapGeo.features && this.mapGeo.features.length) {
      for (const feature of this.mapGeo.features) {
        const key =
          feature && feature.properties && feature.properties['hc-key']
            ? feature.properties['hc-key']
            : '';
        const value = this.getAnalyticsValue(key);
        mapData.push([key, value]);
      }
    }
    return mapData;
  }
  getAnalyticsValue(key) {
    const orgUnitId = this.getOrgUnitIdByHCKey(key);
    const analyticsObj = orgUnitId
      ? _.find(this.analyticsData || [], (item) => item.orgUnit === orgUnitId)
      : null;
    const value = analyticsObj && analyticsObj.value ? analyticsObj.value : 0;
    return value ? value : 0;
  }
  getLocationValidName(key): string {
    const mappingObj = this.getMappingObjectForMapConfig(key);
    const orgUnitName =
      mappingObj && mappingObj.displayName ? mappingObj.displayName : null;
    return orgUnitName;
  }
  getOrgUnitIdByHCKey(key) {
    const mappingObj = this.getMappingObjectForMapConfig(key);
    const orgUnitId =
      mappingObj && mappingObj.orgUnitId ? mappingObj.orgUnitId : null;
    return orgUnitId;
  }
  getMappingObjectForMapConfig(key): any {
    const mapConfig =
      this.mappingOrgUnits && this.mappingOrgUnits.mapConfig
        ? this.mappingOrgUnits.mapConfig
        : [];
    const mappingObj = _.find(
      mapConfig || [],
      (config) => config['hc-key'] === key
    );
    return mappingObj;
  }
}
