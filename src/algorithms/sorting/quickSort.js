import sleep from "../generalSupport/sleep.js";
import swap from "./support/swap.js";
import validateSorting from "./support/validateSorting.js";

async function quickSort(array, options) {
    await sort(array, 0, array.length - 1, options);
    
    validateSorting(array, options);
}

async function sort(array, left, right, options) {
    if (left > right || options.cancelled) return;
    
    let mid = await partition(array, left, right, options);

    await sort(array, left, mid - 1, options);
    await sort(array, mid + 1, right, options);

    if(array.length <= 2000) await sleep(options.delay);

}

async function partition(array, left, right, options) {
    let pivot = [array[right][0], 4];
    let prevI
    let i = left;
    for (let j = left; j < right; j++) {
        if (options.cancelled) return;
        pivot = [pivot[0], 4];
        array[j] = [array[j][0], 1];
        prevI = i;

        if (array[j][0] <= pivot[0]) {
            swap(array, i, j, options.showSwap);
            i++;
        }

        if(!options.onlyDelayOuterLoop) await sleep(options.delay);
        array[j] = [array[j][0], 0];
        array[prevI] = [array[prevI][0], 0];
        pivot = [pivot[0], 4]

    }
    swap(array, i, right, options.showSwap);
    array[right] = [array[right][0], 0];
    array[i] = [array[i][0], 0];
    pivot = [pivot[0], 0];

    return i;
}

export default quickSort;