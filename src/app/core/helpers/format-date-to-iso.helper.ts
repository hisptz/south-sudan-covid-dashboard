export function formatDateToISO(date: string) {
  return date.replace(/-/g, '') || '';
}
