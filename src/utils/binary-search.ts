/**
 *
 *
 * @export
 * @template T
 * @param {Array<T>} arr 数组
 * @param {*} val  匹配值
 * @param {string} property 若检索的数组中的每个值都是变量，那么该为检索的变量的属性名
 * @return {*}
 */
export function binarySearch<T>(arr: Array<T>, val: any, property: string) {
  if (property) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      let obj = arr[mid] as any;
      if (val === obj[property]) {
        return mid;
      } else if (val < obj[property]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return -1;
  } else {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
      let mid = (low + high) / 2;
      if (val === arr[mid]) {
        return mid;
      } else if (val < arr[mid]) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return -1;
  }
}
