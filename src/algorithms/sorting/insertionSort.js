import sleep from "../generalSupport/sleep.js";
import swap from "./support/swap.js";
import validateSorting from "./support/validateSorting.js";

async function insertionSort(array, options, stats) {
  var i, j;
  for (i = 0; i < array.length; i++) {
    j = i;
    while (j > 0 && array[j - 1][0] > array[j][0]) {
      if (options.cancelled) return;

      if (options.showCompare && !options.onlyDelayOuterLoop) {
        array[j - 1][1] = 1;
        array[j] = [array[j][0], 1];
      }
      stats.comparisons.increment();
      swap(array, j - 1, j, options.showSwap, stats);
      if (!options.onlyDelayOuterLoop) await sleep(options.delay);
      array[j - 1][1] = 0;
      array[j] = [array[j][0], 0];
      j--;
    }
    if (array.length <= 2000) await sleep(options.delay);
  }

  stats.time.stopCounting();
  validateSorting(array, options);
}

export default insertionSort;
