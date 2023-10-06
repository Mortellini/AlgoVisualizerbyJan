import validateSorting from "./support/validateSorting.js";
import shuffleArray from "./support/shuffelArray.js";
import sleep from "../generalSupport/sleep.js";

async function bogoSort(array, options, stats) {
  while (!(await validateSorting(array, options))) {
    if (options.cancelled) return;
    shuffleArray(array);
    stats.swaps.increment();
    if (array.length <= 2000) await sleep(options.delay);
  }
  stats.time.stopCounting();
}

export default bogoSort;
