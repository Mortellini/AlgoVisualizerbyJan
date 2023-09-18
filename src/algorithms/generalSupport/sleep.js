/**
 * Pause execution for a given number of milliseconds
 * @param {*} ms 
 * @returns 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default sleep;
