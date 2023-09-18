import getNeighbors from "./support/getNeighbors.js";
import getDirection from "./support/getDirection.js";
import shuffelArray from "../sorting/support/shuffelArray.js";
import setAllGridWalls from "../generalSupport/setAllGridWalls.js";
import sleep from "../generalSupport/sleep.js";
import resetAllCellStates from "../generalSupport/resetAllCellStates.js";

async function randomDFS(grid, start, end, options, drawGrid){
    setAllGridWalls(grid, true);
    resetAllCellStates(grid);

    let sets = [];
    
    let stepSize = parseInt((grid.length * grid[0].length) / 100);    // Only Delay every 1% of the steps
    let stepCount = 0;

    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            let set = new Set();
            set.add(grid[i][j]);
            sets.push(set);
        }
    }

    let walls = []
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            for (let k = 0; k < 4; k++){
                walls.push([i, j, k]);
            }
        }
    }

    shuffelArray(walls);
    for (let i = 0; i < walls.length; i++){
        let [x, y, dir] = walls[i];
        let current = grid[x][y];
        let neighbor = getNeighbors(grid, current)[dir];
        if (neighbor != undefined){
            let currentSetIdx = sets.findIndex(set => set.has(current));
            let neighborSetIdx = sets.findIndex(set => set.has(neighbor));
            if (currentSetIdx != neighborSetIdx){
                current.walls[getDirection(current, neighbor)] = false;
                neighbor.walls[getDirection(neighbor, current)] = false;
                sets[currentSetIdx] = new Set([...sets[currentSetIdx], ...sets[neighborSetIdx]]);
                sets.splice(neighborSetIdx, 1);
            } else {
                continue;
            }
            drawGrid();
            if (!options.instant && !(options.onlyDelayOuterLoop && stepCount % stepSize != 0)) {
                await sleep(options.delay)
            };
        }
        stepCount++;
    }
}

export default randomDFS;