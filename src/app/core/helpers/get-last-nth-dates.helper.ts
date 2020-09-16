import * as moment from 'moment';
export function getLastNthDates(numberOfDates: number = 14): Array<string> {
  let dateArr = [];
  if (numberOfDates > 0) {
    for (let i = 0; i < numberOfDates; i++) {
      const nthDate = moment().subtract(i, 'd').format('YYYY-MM-DD');
      dateArr = [...dateArr, nthDate];
    }
  }
  return dateArr;
}
