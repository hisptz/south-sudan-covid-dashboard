import { map, flattenDeep, concat } from 'lodash';
export function getIdsFromDx(dx: Array<any>) {
  return flattenDeep(
    concat(
      map(dx || [], (dxItem) => {
        return dxItem.id || [];
      }),
      map(dx || [], (dxItem) => {
        if (dxItem.percentageDx) {
          return dxItem.percentageDx.id || [];
        }
        return [];
      })
    )
  );
}
