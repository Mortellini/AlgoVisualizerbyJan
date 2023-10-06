import sleep from "../generalSupport/sleep.js";
import validateSort from "./support/validateSorting.js";

async function radixSort(array, options, stats) {
  let max = 0;
  for (const i in array) {
    if (options.cancelled) return;

    stats.comparisons.increment();
    if (array[i][0] > max) {
      array[i] = [array[i][0], 3];
      max = array[i][0];

      if (!options.onlyDelayOuterLoop) await sleep(options.delay);
      array[i] = [array[i][0], 0];
    }
  }
  let maxDigits = max.toString().length;
  for (let i = 0; i < maxDigits; i++) {
    let digitValues = Array.from({ length: 10 }, (_, i) => []);
    for (let j = 0; j < array.length; j++) {
      if (options.cancelled) return;
      array[j] = [array[j][0], 3];

      let digit = Math.floor(array[j][0] / Math.pow(10, i)) % 10;
      digitValues[digit].push(array[j]);

      if (!options.onlyDelayOuterLoop) await sleep(options.delay);
      array[j] = [array[j][0], 0];
    }
    let index = 0;
    for (let j = 0; j < digitValues.length; j++) {
      for (let k = 0; k < digitValues[j].length; k++) {
        if (options.cancelled) return;

        stats.swaps.increment();
        array[index] = digitValues[j][k];
        array[index] = [array[index][0], 2];
        index++;

        if (!options.onlyDelayOuterLoop) await sleep(options.delay);
        array[index - 1] = [array[index - 1][0], 0];
        if (index > 1) array[index - 2] = [array[index - 2][0], 0];
      }
    }
    if (array.length <= 2000) await sleep(options.delay);
  }

  stats.time.stopCounting();
  validateSort(array, options);
}

export default radixSort;
