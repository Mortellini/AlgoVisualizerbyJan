import validateSorting from "./support/validateSorting.js";
import sleep from "../generalSupport/sleep.js";
import swap from "./support/swap.js";

async function timSort(array, options) {
  for (let i = 0; i < array.length; i += 32) {
    await insertionSort(array, i, Math.min(i + 31, array.length - 1), options);
    await merge(array, 0, i - 1, Math.min(i + 31, array.length - 1), options);

    if (array.length <= 2000) await sleep(options.delay);
  }

  validateSorting(array, options);
}

async function merge(arr, l, m, r, options) {
  let n1 = m - l + 1;
  let n2 = r - m;

  // Create temp arrays
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[l + i];
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
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

async function insertionSort(array, startIdx, endIdx, options) {
  let i, j;
  for (i = startIdx; i <= endIdx; i++) {
    j = i;
    while (j > startIdx && array[j - 1][0] > array[j][0]) {
      if (!options.cancelled) return;
      if (options.showCompare) {
        array[j - 1][1] = 1;
        array[j][1] = 1;
      }
      swap(array, j - 1, j, options.showSwap);
      if (!options.onlyDelayOuterLoop) await sleep(options.delay);
      array[j - 1][1] = 0;
      array[j][1] = 0;
      j--;
    }
    if (array.length <= 2000) await sleep(options.delay);
  }
}

export default timSort;
