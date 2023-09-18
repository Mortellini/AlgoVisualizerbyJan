import getNeighbors from "./support/getNeighbors.js";
import Stack from "../pathfinding/support/stack.js";
import getDirection from "./support/getDirection.js";
import setAllGridWalls from "../generalSupport/setAllGridWalls.js";
import sleep from "../generalSupport/sleep.js";
import resetAllCellStates from "../generalSupport/resetAllCellStates.js";

async function randomDFS(grid, start, end, options, drawGrid){
    setAllGridWalls(grid, true);
    resetAllCellStates(grid);
    
    let stack = new Stack();
    stack.store(start);
    let stepSize = parseInt((grid.length * grid[0].length) / 100);    // Only Delay every 1% of the steps
    let stepCount = 0;

    let endFound = false;

    while(!stack.isEmpty()) {
        let current = stack.pop();
        let newNeighbors = getNeighbors(grid, current)
            .filter(neighbor => neighbor.state == 0 || (neighbor.state == 2 && !endFound));

        if(newNeighbors.length > 0){
            let randomNeighbor = newNeighbors[Math.floor(Math.random() * newNeighbors.length)];

            current.walls[getDirection(current, randomNeighbor)] = false;
            randomNeighbor.walls[getDirection(randomNeighbor, current)] = false;

            if(randomNeighbor.state != 2){
                stack.store(current);
                randomNeighbor.state = 4;
                stack.store(randomNeighbor);
            } else {
                endFound = true;
            }

        } else {
            if (current.state == 4) current.state = 3;
        }

        drawGrid();
        if (!options.instant && !(options.onlyDelayOuterLoop && stepCount % stepSize != 0)) {
            await sleep(options.delay)
        };
        stepCount++;
    }

}

export default randomDFS;