import validateSorting from "./support/validateSorting.js";
import sleep from "../generalSupport/sleep.js";
import swap from "./support/swap.js";

async function timSort(array, options, stats) {
  for (let i = 0; i < array.length; i += 32) {
    if (options.cancelled) return;
    await insertionSort(array, i, Math.min(i + 31, array.length - 1), options, stats);
    await merge(array, 0, i - 1, Math.min(i + 31, array.length - 1), options, stats);

    if (array.length <= 2000) await sleep(options.delay);
  }

  stats.time.stopCounting();
  validateSorting(array, options);
}

async function merge(arr, l, m, r, options, stats) {
  let n1 = m - l + 1;
  let n2 = r - m;

  // Create temp arrays
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) {
    if (options.cancelled) return;
    L[i] = arr[l + i];
  }
  for (let j = 0; j < n2; j++) {
    if (options.cancelled) return;
    R[j] = arr[m + 1 + j];
  }

  // Merge the temp arrays back into arr[l..r]

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    if (options.cancelled) return;
    L[i] = [L[i][0], 1];
    R[j] = [R[j][0], 1];
    let prevI = i;
    let prevJ = j;
    if (!options.onlyDelayOuterLoop) await sleep(options.delay);

    stats.comparisons.increment();
    if (L[i][0] <= R[j][0]) {
      arr[l + i] = [arr[l + i][0], 2];
      L[i] = [L[i][0], 2];

      arr[k] = L[i];
      i++;
    } else {
      arr[m + 1 + j] = [arr[m + 1 + j][0], 2];
      R[j] = [R[j][0], 2];

      arr[k] = R[j];
      j++;
    }
    stats.swaps.increment();
    k++;

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    arr[l + prevI] = [arr[l + prevI][0], 0];
    arr[m + 1 + prevJ] = [arr[m + 1 + prevJ][0], 0];
    arr[k - 1] = [arr[k - 1][0], 0];
  }

  while (i < n1) {
    if (options.cancelled) return;
    arr[l + i] = [arr[l + i][0], 2];
    L[i] = [L[i][0], 2];
    stats.swaps.increment();

    arr[k] = L[i];
    i++;
    k++;

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    arr[l + i - 1] = [arr[l + i - 1][0], 0];
    arr[k - 1] = [arr[k - 1][0], 0];
  }

  while (j < n2) {
    if (options.cancelled) return;
    arr[m + 1 + j] = [arr[m + 1 + j][0], 2];
    R[j] = [R[j][0], 2];
    stats.swaps.increment();

    arr[k] = R[j];

    j++;
    k++;

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    arr[m + j] = [arr[m + j][0], 0];
    arr[k - 1] = [arr[k - 1][0], 0];
  }
}

async function insertionSort(array, startIdx, endIdx, options, stats) {
  let i, j;
  for (i = startIdx; i <= endIdx; i++) {
    j = i;
    while (j > startIdx && array[j - 1][0] > array[j][0]) {
      if (options.cancelled) return;
      if (options.showCompare) {
        array[j - 1] = [array[j - 1][0], 1];
        array[j] = [array[j][0], 1];
      }
      stats.comparisons.increment();
      swap(array, j - 1, j, options.showSwap, stats);
      if (!options.onlyDelayOuterLoop) await sleep(options.delay);
      array[j - 1] = [array[j - 1][0], 0];
      array[j] = [array[j][0], 0];
      j--;
    }
    if (array.length <= 2000) await sleep(options.delay);
  }
}

export default timSort;
