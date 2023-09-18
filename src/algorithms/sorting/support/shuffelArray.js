
 
/**
 * Shuffel array using Fisher-Yates algorithm
 * 
 * @param {Number[][2]} array 
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.round(Math.random() * (i));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default shuffleArray;