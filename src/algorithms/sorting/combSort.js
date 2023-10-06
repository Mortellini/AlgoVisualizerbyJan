import sleep from "../generalSupport/sleep.js";
import validateSorting from "./support/validateSorting.js";
import swap from "./support/swap.js";

async function combSort(array, options, stats) {
  let gap = array.length;
  let swapped = true;

  while (gap !== 1 || swapped) {

    swapped = false;
    gap = getGap(gap);

    for (let i = 0; i < array.length - gap; i++) {
      if (options.cancelled) return;

      if (options.showCompare) {
        array[i] = [array[i][0], 1];
        array[i + gap] = [array[i + gap][0], 1];
      }
      stats.comparisons.increment();
      if (array[i][0] > array[i + gap][0]) {
        swap(array, i, i + gap, options.showSwap, stats);
        swapped = true;
      }

      array[i] = [array[i][0], 0];
      array[i + gap] = [array[i + gap][0], 0];

      if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    }

    if (array.length <= 2000) await sleep(options.delay);
  }
  stats.time.stopCounting();
  validateSorting(array, options);
}

function getGap(gap) {
  gap = parseInt((gap * 10) / 13, 10);
  if (gap < 1) {
    return 1;
  }
  return gap;
}

export default combSort;
