
function getDirection (startCell, endCell) {
    if (startCell.x < endCell.x) {
        return 1;
    } else if (startCell.x > endCell.x) {
        return 3;
    } else if (startCell.y < endCell.y) {
        return 2;
    } else if (startCell.y > endCell.y) {
        return 0;
    }
}

export default getDirection;