import sleep from "../generalSupport/sleep.js";
import swap from "./support/swap.js";
import validateSorting from "./support/validateSorting.js";

async function selectionSort(array, options) {
    var i, j, min, exMin;
    for (i = 0; i < array.length; i++) {
        min = i;
        exMin = i;
        for (j = i; j < array.length; j++) {
            if (!options.cancelled) return;
            if (options.showCompare) {
                array[min][1] = 1;
                array[j][1] = 1;
            }
            if (array[min][0] > array[j][0]) {
                exMin = min;
                min = j;
            }
            array[exMin][1] = 0;
            array[j][1] = 0;
            if(!options.onlyDelayOuterLoop) await sleep(options.delay);
        }
        if (options.showSwap) {
            array[min][1] = 2;
            array[i][1] = 2;
        }
        
        swap(array, min, i, options.showSwap);

        if(array.length <= 2000) await sleep(options.delay);
        array[min][1] = 0;
        array[i][1] = 0;
    }
    
    validateSorting(array, options);
}

export default selectionSort;