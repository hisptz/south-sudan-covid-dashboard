import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
@Component({
  selector: 'app-confirmed-cases-and-deaths-section',
  templateUrl: './confirmed-cases-and-deaths-section.component.html',
  styleUrls: ['./confirmed-cases-and-deaths-section.component.scss'],
})
export class ConfirmedCasesAndDeathsSectionComponent implements OnInit {
  constructor() {}
 days = [
    '19 August 2020',
    '20 August 2020',
    '21 August 2020',
    '22 August 2020',
    '23 August 2020',
    '24 August 2020',
    '25 August 2020',
    '26 August 2020',
    '27 August 2020',
    '28 August 2020',
    '29 August 2020',
    '30 August 2020',
    '31 August 2020',
    '1 September 2020',
  ];
  confirmedCases = [
    49,
    71,
    106,
    129,
    144,
    176,
    135,
    148,
    216,
    200,
    187,
    194,
    95,
    54,
  ];
  deathCases = [
    7,
    6,
    9,
    14,
    18,
    21,
    25,
    26,
    23,
    18,
    15,
    8,
    13,
    9,
  ];
  cumulativeDeathCases = [
    7,
    13,
    22,
    36,
    54,
    75,
    100,
    126,
    149,
    167,
    172,
    180,
    193,
    202,
  ]

  chartTitle = 'CONFIRMED CASES AND DEATHS IN LAST 14 DAYS';
  rightYAxisTitle = 'Death cases';
  leftYAxisTitle = 'Confirmed cases';
  rightTertiaryYAxisTitle = 'Cumulative Death Cases';
  xAxisTitle = 'Date'
  ngOnInit(): void {}
}
