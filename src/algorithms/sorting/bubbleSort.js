import sleep from "../generalSupport/sleep.js";
import validateSorting from "./support/validateSorting.js";
import swap from "./support/swap.js";

async function bubbleSort(array, options, stats) {
  let i, j;
  let swapped = true;
  for (i = 0; i < array.length && swapped; i++) {
    swapped = false;
    for (j = 0; j < array.length - 1 - i; j++) {
      if (options.cancelled) return;

      if (options.showCompare && !options.onlyDelayOuterLoop) {
        array[j][1] = 1;
        array[j + 1] = [array[j + 1][0], 1];
      }
      stats.comparisons.increment();
      if (array[j][0] > array[j + 1][0]) {
        swap(array, j, j + 1, options.showSwap, stats);
        swapped = true;
      }
      array[j][1] =  0;
      array[j + 1] = [array[j + 1][0], 0];
      if (options.onlyDelayOuterLoop) {
        await sleep(options.delay);
      }
    }
    if (array.length <= 2000) await sleep(options.delay);
  }

  stats.time.stopCounting();
  validateSorting(array, options);
}

export default bubbleSort;
