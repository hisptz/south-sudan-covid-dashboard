export function getStringFromArray(data: any[]) {
  return data && data.length ? data.join(';') : '';
}
