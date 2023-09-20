import validateSort from "./support/validateSorting.js";
import swap from "./support/swap.js";
import sleep from "../generalSupport/sleep.js";

async function heapSort(arr, options) {
  let n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (options.cancelled) return;

    await heapify(arr, n, i, options);
    if (arr.length < 2000) await sleep(options.delay);
  }
  for (let i = n - 1; i > 0; i--) {
    if (options.cancelled) return;
    
    swap(arr, 0, i, options.showSwap);
    await heapify(arr, i, 0, options);
    if (arr.length <= 2000) await sleep(options.delay);
  }

  validateSort(arr, options);
}

async function heapify(arr, n, i, options) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (options.showCompare) {
    arr[i] = [arr[i][0], 1];
    if (n > l) arr[l] = [arr[l][0], 1];
    if (n > r) arr[r] = [arr[r][0], 1];
  }

  if (l < n && arr[l][0] > arr[largest][0]) {
    largest = l;
  }
  if (r < n && arr[r][0] > arr[largest][0]) {
    largest = r;
  }
  if (largest !== i) {
    swap(arr, i, largest, options.showSwap);

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);

    arr[i] = [arr[i][0], 0];
    if (n > l) arr[l] = [arr[l][0], 0];
    if (n > r) arr[r] = [arr[r][0], 0];

    await heapify(arr, n, largest, options);
  }

  arr[i] = [arr[i][0], 0];
  if (n > l) arr[l] = [arr[l][0], 0];
  if (n > r) arr[r] = [arr[r][0], 0];
}

export default heapSort;
export { heapify };
