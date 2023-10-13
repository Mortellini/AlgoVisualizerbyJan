import sleep from "../generalSupport/sleep.js";
import validateSort from "./support/validateSorting.js";

async function countingSort(array, options, stats) {
  var n = array.length;

  // The output character array that will have sorted arr
  var output = Array.from({ length: n }, (_, i) => 0);

  // Create a count array to store count of individual
  // characters and initialize count array as 0
  let max = 0;
  for (let i in array) {
    if (options.cancelled) return;
    array[i] = [array[i][0], 1];
    stats.comparisons.increment();
    if (array[i][0] > max) {
      max = array[i][0];
    }
    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    array[i] = [array[i][0], 0];
  }
  var count = Array.from({ length: max + 1 }, (_, i) => 0);

  // store count of each character
  for (let i = 0; i < n; ++i) {
    if (options.cancelled) return;
    array[i] = [array[i][0], 3];
    ++count[array[i][0]];

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    array[i] = [array[i][0], 0];
  }

  // Change count[i] so that count[i] now contains actual
  // position of this character in output array
  for (let i = 1; i <= max; ++i) {
    if (options.cancelled) return;
    count[i] += count[i - 1];
  }
  // Build the output character array
  // To make it stable we are operating in reverse order.
  for (let i = n - 1; i >= 0; i--) {
    if (options.cancelled) return;
    output[count[array[i][0]] - 1] = [array[i][0], 2];
    --count[array[i][0]];
  }

  // Copy the output array to arr, so that arr now
  // contains sorted characters
  for (let i = 0; i < n; ++i) {
    if (options.cancelled) return;
    array[i] = output[i];

    stats.swaps.increment();
    if (array.length <= 2000) await sleep(options.delay);
    array[i] = [array[i][0], 0];
  }

  stats.time.stopCounting();
  validateSort(array, options);
}

export default countingSort;
