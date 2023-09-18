import Stack from "./support/stack.js";
import getNeighbors from "./support/getNeighbors.js";
import getPath from "./support/getPath.js";
import sleep from "../generalSupport/sleep.js";

async function dfsPathing(grid, start, end, options, drawGrid) {
  // Create a queue
  let stack = new Stack();

  // Add the start node to the stack
  stack.store(start);

  let i = stack.length;
  // While the queue is not empty
  while (!stack.isEmpty()) {
    if (i <= 0) i = stack.length;
    // Get the next node
    let node = stack.pop();
    // Get the neighbors of the node
    let neighbors = getNeighbors(grid, node, options.diagonalPathing);
    // For each neighbor
    for (let i = 0; i < neighbors.length; i++) {
      // If the neighbor has not been visited
      if (neighbors[i].state == 0 || (neighbors[i].state == 4 && neighbors[i].distance > node.distance + 1)) {
        // Set the neighbor's parent to the current node
        neighbors[i].parent = node;

        // Set the neighbor as visited
        neighbors[i].state = 4;
        // Set the neighbor's distance to the current node's distance + 1
        neighbors[i].distance = node.distance + 1;
        

        // Add the neighbor to the stack
        stack.store(neighbors[i]);
      }
      else if (neighbors[i].state == 2) {
        neighbors[i].parent = node;
        return getPath(end, options, drawGrid);
      }
      
      drawGrid();
      if (!options.onlyDelayOuterLoop) await sleep(options.delay);

    }

    if (node.state != 1) node.state = 3;
    i--;

    drawGrid();
    if (i==0) await sleep(options.delay);
  }

  // If no path is found, return null
  return null;
}

export default dfsPathing;
