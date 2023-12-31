import sleep from '../../generalSupport/sleep.js';

async function validateSort(array, options) {
    for (let i = 0; i < array.length-1; i++) {
        if (options.cancelled) return;
        if(array[i][0] < array[i+1][0]) {
            array[i] = [array[i][0], 5];
        } else {
            array[i] = [array[i][0], 6];
            return false;
        }
        if(array.length <= 2000) await sleep(options.delay);
    }
    
    array[array.length-1] = [array[array.length-1][0], 5];
    return true;
}

export default validateSort;