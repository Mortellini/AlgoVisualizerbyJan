import sleep from "../generalSupport/sleep.js";
import validateSort from "./support/validateSorting.js";

async function radixSort(arr, options){
    let max = 0;
    for (const i in arr) {
        if (!options.cancelled) return;
        if (arr[i][0] > max) {
            max = arr[i][0];
        }
    }
    let maxDigits = max.toString().length;
    for (let i = 0; i < maxDigits; i++) {
        let digitValues = Array.from({length: 10}, (_, i) => []);
        for (let j = 0; j < arr.length; j++) {
            if (!options.cancelled) return;
            arr[j][1] = 1;

            let digit = Math.floor(arr[j][0] / Math.pow(10, i)) % 10;
            digitValues[digit].push(arr[j]);

            if(!options.onlyDelayOuterLoop) await sleep(options.delay);
            arr[j][1] = 0;
        }
        let index = 0;
        for (let j = 0; j < digitValues.length; j++) {
            for (let k = 0; k < digitValues[j].length; k++) {
                if (!options.cancelled) return;
                arr[index] = digitValues[j][k];
                arr[index][1] = 2;
                index++;

                if(!options.onlyDelayOuterLoop) await sleep(options.delay);
                arr[index-1][1] = 0;
                if (index>1)arr[index-2][1] = 0;
            }
        }
        if(arr.length <= 2000) await sleep(options.delay);
    }

    validateSort(arr, options);
}

export default radixSort;