import sleep from '../../generalSupport/sleep.js';

async function validateSort(array, options) {
    for (let i = 0; i < array.length-1; i++) {
        if (!options.cancelled) return;
        if(array[i][0] < array[i+1][0]) {
            array[i][1] = 3;
        } else {
            array[i][1] = 4;
            return false;
        }
        if(array.length <= 2000) await sleep(options.delay);
    }
    
    array[array.length-1][1] = 3;
    return true;
}

export default validateSort;