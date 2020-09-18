import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  @Input() xAxisCategories = [];
  @Input() barChartYAxisData = [];
  @Input() lineChartYAxisData = [];
  @Input() tertiaryYaxisData = [];
  @Input() chartTitle = '';
  @Input() rightYAxisTitle = '';
  @Input() leftYAxisTitle = '';
  @Input() rightTertiaryYAxisTitle = '';
  @Input() xAxisTitle = '';
  chart;
  constructor() {}
  initializeGraph() {
    this.chart = new Chart({
      chart: {
        zoomType: 'xy',
      },
      title: {
        text: this.chartTitle,
        align: 'left',
        style: {
          fontWeight: 'bold',
        },
      },
      subtitle: {
        text: 'Source: southsudanhis.org/',
        align: 'left',
      },
      xAxis: [
        {
          categories: this.xAxisCategories,
          crosshair: true,
        },
      ],
      yAxis: [
        {
          // Primary yAxis
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[2],
            },
          },
          title: {
            text: this.rightYAxisTitle,
            style: {
              color: Highcharts.getOptions().colors[2],
            },
          },
          opposite: true,
        },
        {
          // Secondary yAxis
          gridLineWidth: 0,
          title: {
            text: this.leftYAxisTitle,
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
          labels: {
            format: '{value}',
            style: {
              color: Highcharts.getOptions().colors[0],
            },
          },
        },
        {
          // Tertiary yAxis
          gridLineWidth: 0,
          title: {
            text: this.rightTertiaryYAxisTitle,
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          labels: {
            format: '{value} ',
            style: {
              color: Highcharts.getOptions().colors[1],
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        shared: true,
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || // theme
          'rgba(255,255,255,0.25)',
      },
      series: [
        {
          name: this.leftYAxisTitle,
          type: 'column',
          yAxis: 1,
          data: this.lineChartYAxisData,
          tooltip: {
            valueSuffix: ' ',
          },
        },
        {
          name: this.rightTertiaryYAxisTitle,
          type: 'spline',
          yAxis: 2,
          data: this.tertiaryYaxisData,
          marker: {
            enabled: false,
          },
          dashStyle: 'ShortDot',
          tooltip: {
            valueSuffix: ' ',
          },
        },

        {
          name: this.rightYAxisTitle,
          type: 'spline',
          data: this.barChartYAxisData,
          tooltip: {
            valueSuffix: ' ',
          },
        },
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                floating: false,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                x: 0,
                y: 0,
              },
              yAxis: [
                {
                  labels: {
                    align: 'right',
                    x: 0,
                    y: -6,
                  },
                  showLastLabel: true,
                },
                {
                  labels: {
                    align: 'left',
                    x: 0,
                    y: -6,
                  },
                  showLastLabel: false,
                },
                {
                  visible: false,
                },
              ],
            },
          },
        ],
      },
    });
  }
  ngOnInit(): void {
    this.initializeGraph();
  }
}
