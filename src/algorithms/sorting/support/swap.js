/**
 * Swaps two elements in an array
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 */
function swap(arr, i, j, showSwap) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  if (showSwap) {
    arr[i][1] = 2;
    arr[j][1] = 2;
  }
}

export default swap;