import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import { MAP_GEO } from './map-geo';
import * as _ from 'lodash';

@Component({
  selector: 'app-map-sectction',
  templateUrl: './map-sectction.component.html',
  styleUrls: ['./map-sectction.component.scss'],
})
export class MapSectctionComponent implements OnInit, AfterViewInit {
  mapGeo: any;

  currentChart: any;
  currentDevice: string;

  constructor() {
    this.mapGeo = MAP_GEO.ss;
  }

  ngOnInit(): void {}

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
        text: 'Title',
      },
      subtitle: {
        text: 'Sub tittle',
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
