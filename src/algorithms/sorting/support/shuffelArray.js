
 
/**
 * Shuffel array using Fisher-Yates algorithm
 * 
 * @param {Number[][2]} array 
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.round(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
        array[i][1] = 0;
        array[j][1] = 0;
    }
}

export default shuffleArray;