import { formatDateToISO } from './format-date-to-iso.helper';

export function getArrayOfIsoFormattedDates(
  dates: Array<string>
): Array<string> {
  let isoDates = [];
  if (dates && dates.length) {
    for (const date of dates) {
      const isoDate = formatDateToISO(date);
      isoDates = isoDate ? [...isoDates, isoDate] : [...isoDates];
    }
  }
  return isoDates;
}
