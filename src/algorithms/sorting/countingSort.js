import sleep from "../generalSupport/sleep.js";
import validateSort from "./support/validateSorting.js";

async function countingSort(arr, options) {
  var n = arr.length;

  // The output character array that will have sorted arr
  var output = Array.from({ length: n }, (_, i) => 0);

  // Create a count array to store count of individual
  // characters and initialize count array as 0
  let max = 0;
  for (let i in arr) {
    if (!options.cancelled) return;
    if (arr[i][0] > max) {
      max = arr[i][0];
    }
  }
  var count = Array.from({ length: max + 1 }, (_, i) => 0);

  // store count of each character
  for (let i = 0; i < n; ++i) {
    if (!options.cancelled) return;
    arr[i][1] = 3;
    ++count[arr[i][0]];

    if (!options.onlyDelayOuterLoop) await sleep(options.delay);
    arr[i][1] = 0;
  }

  // Change count[i] so that count[i] now contains actual
  // position of this character in output array
  for (let i = 1; i <= max; ++i) {
    if (!options.cancelled) return;
    count[i] += count[i - 1];
  }
  // Build the output character array
  // To make it stable we are operating in reverse order.
  for (let i = n - 1; i >= 0; i--) {
    if (!options.cancelled) return;
    output[count[arr[i][0]] - 1] = arr[i];
    --count[arr[i][0]];
  }

  // Copy the output array to arr, so that arr now
  // contains sorted characters
  for (let i = 0; i < n; ++i) {
    if (!options.cancelled) return;
    arr[i] = output[i];

    arr[i][1] = 2;
    if (arr.length <= 2000) await sleep(options.delay);
    arr[i][1] = 0;
  }

  validateSort(arr, options);
}

export default countingSort;
