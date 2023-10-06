import validateSort from "./support/validateSorting.js";
import swap from "./support/swap.js";
import sleep from "../generalSupport/sleep.js";

async function heapSort(arr, options, stats) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (options.cancelled) return;

    await heapify(arr, n, i, options);
    if (arr.length < 2000) await sleep(options.delay);
  }
  for (let i = n - 1; i > 0; i--) {
    if (options.cancelled) return;

    swap(arr, 0, i, options.showSwap, stats);
    await heapify(arr, i, 0, options, stats);
    if (arr.length <= 2000) await sleep(options.delay);
  }

  stats.time.stopCounting();
  validateSort(arr, options);
}

async function heapify(arr, n, i, options, stats) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (options.showCompare) {
    arr[i] = [arr[i][0], 1];
    stats.comparisons.increment();
    if (n > l) arr[l] = [arr[l][0], 1];
    stats.comparisons.increment();
    if (n > r) arr[r] = [arr[r][0], 1];
  }

  stats.comparisons.increment();
  if (l < n && arr[l][0] > arr[largest][0]) {
    largest = l;
  }
  stats.comparisons.increment();
  if (r < n && arr[r][0] > arr[largest][0]) {
    largest = r;
  }
  stats.comparisons.increment();
  if (largest !== i) {
    swap(arr, i, largest, options.showSwap, stats);

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);

    arr[i] = [arr[i][0], 0];
    if (n > l) arr[l] = [arr[l][0], 0];
    if (n > r) arr[r] = [arr[r][0], 0];

    await heapify(arr, n, largest, options, stats);
  }

  arr[i] = [arr[i][0], 0];
  if (n > l) arr[l] = [arr[l][0], 0];
  if (n > r) arr[r] = [arr[r][0], 0];
}

export default heapSort;
export { heapify };
