import sleep from "../generalSupport/sleep.js";
import validateSorting from "./support/validateSorting.js";
import swap from "./support/swap.js";

async function cocktailSort(array, options) {
  let i, j;
  let swapped = true;
  for (i = 0; i < array.length / 2 && swapped; i++) {

    swapped = false;
    for (j = i; j < array.length - 1 - i; j++) {
      if (!options.cancelled) return;

      if (options.showCompare) {
        array[j][1] = 1;
        array[j + 1][1] = 1;
      }
      if (array[j][0] > array[j + 1][0]) {
        swap(array, j, j + 1, options.showSwap);
        swapped = true;
      }
      array[j][1] = 0;
      array[j + 1][1] = 0;
      if (!options.onlyDelayOuterLoop) {
        await sleep(options.delay);
      }
    }
    for (j = array.length - 2 - i; j >= i; j--) {
      if (!options.cancelled) return;
      
      if (options.showCompare) {
        array[j][1] = 1;
        array[j + 1][1] = 1;
      }
      if (array[j][0] > array[j + 1][0]) {
        swap(array, j, j + 1, options.showSwap);
        swapped = true;
      }
      array[j][1] = 0;
      array[j + 1][1] = 0;
      if (!options.onlyDelayOuterLoop) {
        await sleep(options.delay);
      }
    }
    if (array.length <= 2000) await sleep(options.delay);
  }

  validateSorting(array, options);
}

export default cocktailSort;
