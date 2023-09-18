/**
 * Resets all visited/marked cells states to 0
 * 
 * @param {GridCell[][]} grid 
 */
function resetAllCellStates(grid) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j].state == 3 || grid[i][j].state == 4 || grid[i][j].state == 5) {
          grid[i][j].state = 0;
        }
      }
    }
}

export default resetAllCellStates;