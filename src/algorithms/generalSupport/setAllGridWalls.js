/**
 * Sets all the walls of the grid to the given state
 * 
 * @param {Cell[][]} grid 
 * @param {Boolean} newState 
 */
function setAllGridWalls (grid, newState){
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          grid[i][j].walls = [newState, newState, newState, newState];
        }
    }
}

export default setAllGridWalls;