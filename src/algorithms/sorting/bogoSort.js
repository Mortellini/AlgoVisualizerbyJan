import validateSorting from "./support/validateSorting.js";
import shuffleArray from "./support/shuffelArray.js";
import sleep from "../generalSupport/sleep.js";

async function bogoSort(array, options) {
  while (!(await validateSorting(array, options))) {
    if (!options.cancelled) return;
    shuffleArray(array);
    if (array.length <= 2000) await sleep(options.delay);
    for (let i = 0; i < array.length; i++) {
      array[i][1] = 0;
    }
  }
}

export default bogoSort;
