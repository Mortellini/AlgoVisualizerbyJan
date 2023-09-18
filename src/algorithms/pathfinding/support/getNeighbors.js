
function getNeighbors(grid, currentNode, diagonal = false){
    let neighbors = [];
    let x = currentNode.x;
    let y = currentNode.y;
    let gridWidth = grid[0].length;
    let gridHeight = grid.length;

    // Check the top neighbor
    if (y > 0 && currentNode.walls[0] == false) {
        neighbors.push(grid[y-1][x]);
    }

    // Check the right neighbor
    if (x < gridWidth - 1 && currentNode.walls[1] == false) {
        neighbors.push(grid[y][x+1]);
    }

    // Check the bottom neighbor
    if (y < gridHeight - 1 && currentNode.walls[2] == false) {
        neighbors.push(grid[y+1][x]);
    }

    // Check the left neighbor
    if (x > 0 && currentNode.walls[3] == false) {
        neighbors.push(grid[y][x-1]);
    }
    return neighbors;
}

export default getNeighbors;