import validateSorting from "./support/validateSorting.js";
import sleep from "../generalSupport/sleep.js";

async function mergeSort(array, options) {
  await sort(array, 0, array.length - 1, options);

  validateSorting(array, options);
}

async function sort(arr, lo, hi, options) {
  if (hi <= lo || !options.cancelled) return;
  let mid = lo + parseInt((hi - lo) / 2);

  await sort(arr, lo, mid, options);
  await sort(arr, mid + 1, hi, options);
  await merge(arr, lo, mid, hi, options);

  if (arr.length <= 2000) await sleep(options.delay);
}

async function merge(arr, l, m, r, options) {
  let n1 = m - l + 1;
  let n2 = r - m;

  // Create temp arrays
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) {
    if (!options.cancelled) return;
    L[i] = arr[l + i];
  }
  for (let j = 0; j < n2; j++) {
    if (!options.cancelled) return;
    R[j] = arr[m + 1 + j];
  }

  // Merge the temp arrays back into arr[l..r]

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    if (!options.cancelled) return;
    L[i][1] = 1;
    R[j][1] = 1;
    let prevI = i;
    let prevJ = j;
    if (!options.onlyDelayOuterLoop) await sleep(options.delay);

    if (L[i][0] <= R[j][0]) {
      arr[l + i][1] = 2;
      L[i][1] = 2;

      arr[k] = L[i];
      i++;
    } else {
      arr[m + 1 + j][1] = 2;
      R[j][1] = 2;

      arr[k] = R[j];
      j++;
    }
    k++;

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    arr[l + prevI][1] = 0;
    arr[m + 1 + prevJ][1] = 0;
    arr[k - 1][1] = 0;
  }

  while (i < n1) {
    if (!options.cancelled) return;
    arr[l + i][1] = 2;
    L[i][1] = 2;

    arr[k] = L[i];
    i++;
    k++;

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    arr[l + i - 1][1] = 0;
    arr[k - 1][1] = 0;
  }

  while (j < n2) {
    if (!options.cancelled) return;
    arr[m + 1 + j][1] = 2;
    R[j][1] = 2;

    arr[k] = R[j];

    j++;
    k++;

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    arr[m + j][1] = 0;
    arr[k - 1][1] = 0;
  }
}

export default mergeSort;
