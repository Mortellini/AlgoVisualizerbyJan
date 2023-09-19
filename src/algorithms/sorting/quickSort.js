import sleep from "../generalSupport/sleep.js";
import swap from "./support/swap.js";
import validateSorting from "./support/validateSorting.js";

async function quickSort(array, options) {
    await sort(array, 0, array.length - 1, options);
    
    validateSorting(array, options);
}

async function sort(array, left, right, options) {
    if (left > right || !options.cancelled) return;
    
    let mid = await partition(array, left, right, options);

    await sort(array, left, mid - 1, options);
    await sort(array, mid + 1, right, options);

    if(array.length <= 2000) await sleep(options.delay);

}

async function partition(array, left, right, options) {
    let pivot = array[right];
    pivot[1] = 4;
    let prevI
    let i = left;
    for (let j = left; j < right; j++) {
        if (!options.cancelled) return;
        pivot[1] = 1;
        array[j][1] = 1;
        prevI = i;

        if (array[j][0] <= pivot[0]) {
            swap(array, i, j, options.showSwap);

            i++;
        }

        if(!options.onlyDelayOuterLoop) await sleep(options.delay);
        array[j][1] = 0;
        array[prevI][1] = 0;

    }
    swap(array, i, right, options.showSwap);
    array[right][1] = 0;
    array[i][1] = 0;
    pivot[1] = 0;

    return i;
}

export default quickSort;