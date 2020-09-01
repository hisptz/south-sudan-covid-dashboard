import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tests-conducted-and-positive-cases',
  templateUrl: './tests-conducted-and-positive-cases.component.html',
  styleUrls: ['./tests-conducted-and-positive-cases.component.scss']
})
export class TestsConductedAndPositiveCasesComponent implements OnInit {

  constructor() { }
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
  testsConducted = [
    56,
    49,
    100,
    99,
    124,
    176,
    135,
    148,
    216,
    200,
    187,
    194,
    200,
    221,
  ];
  postiveCases = [
    3,
    6,
    9,
    14,
    18,
    21,
    25,
    26,
    23,
    28,
    40,
    52,
    49,
    60,
  ];
  // cumulativeDeathCases = [
  //   7,
  //   13,
  //   22,
  //   36,
  //   54,
  //   75,
  //   100,
  //   126,
  //   149,
  //   167,
  //   172,
  //   180,
  //   193,
  //   202,
  // ]

  chartTitle = 'TESTS CONDUCTED AND POSITIVE CASES IN LAST 14 DAYS';
  rightYAxisTitle = 'Positive cases';
  leftYAxisTitle = 'Tests conducted';
  // rightTertiaryYAxisTitle = 'Cumulative Death Cases';
  xAxisTitle = 'Date';

  ngOnInit(): void {
  }
  

}
