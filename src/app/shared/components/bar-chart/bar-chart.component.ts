import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() yAxisData = [];
  @Input() xAxisData = [];
  @Input() chartTitle = '';
  chart;
  highcharts = Highcharts;
  constructor() {}

  ngOnInit(): void {
    this.initializeGraph();
  }
  initializeGraph() {
    this.chart = new Chart({
      chart: {
        type: 'column',
        zoomType: 'xy',
      },
      title: {
        text: this.chartTitle,
      },
      subtitle: {
        text: 'Source: southsudanhis.org/',
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 250,
        y: 100,
        floating: true,
        borderWidth: 1,

        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)',
        shadow: true,
      },
      xAxis: {
        categories: this.xAxisData,
        crosshair: true,
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Positive cases',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: ' ',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: this.yAxisData,
    });
  }
  initializeGraph2() {
    
  }
}
