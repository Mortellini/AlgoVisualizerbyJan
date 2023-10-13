import sleep from "../generalSupport/sleep.js";
import swap from "./support/swap.js";
import validateSorting from "./support/validateSorting.js";

async function selectionSort(array, options, stats) {
    var i, j, min, exMin;
    for (i = 0; i < array.length; i++) {
        min = i;
        exMin = i;
        for (j = i; j < array.length; j++) {
            if (options.cancelled) {
                return;
            }
            if (options.showCompare && !options.onlyDelayOuterLoop) {
                array[min][1] = 1;
                array[j] = [array[j][0], 1];
            }
            stats.comparisons.increment();
            if (array[min][0] > array[j][0]) {
                exMin = min;
                min = j;
            }
            if(!options.onlyDelayOuterLoop) await sleep(options.delay);
            array[exMin][1] = 0;
            array[j] = [array[j][0], 0];
        }
        if (options.showSwap) {
            array[min][1] = 2;
            array[i] = [array[i][0], 2];
            if (i>0) ;
        }
        
        swap(array, min, i, options.showSwap, stats);

        if(array.length <= 2000) await sleep(options.delay);
        array[i][1] = 0;
        array[min] = [array[min][0], 0];
    }
    
    stats.time.stopCounting();
    validateSorting(array, options);
}

export default selectionSort;