export function generateCumulativeFrequency(arr: Array<any>) {
  const cumulativeArr = [];
  const arrLength = arr.length;
  let sum = 0;
  for (let i = 0; i < arrLength; i++) {
  
    sum = sum + arr[i];
    cumulativeArr.push(sum);
  }
  return cumulativeArr;
}
