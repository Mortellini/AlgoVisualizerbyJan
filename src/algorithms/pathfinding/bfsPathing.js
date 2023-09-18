import Queue from "./support/queue.js";
import getNeighbors from "./support/getNeighbors.js";
import getPath from "./support/getPath.js";
import sleep from "../generalSupport/sleep.js";

async function bfsPathing(grid, start, end, options, drawGrid) {
  // Create a queue
  let queue = new Queue();

  // Add the start node to the queue
  queue.enqueue(start);

  let i = queue.length;
  // While the queue is not empty
  while (!queue.isEmpty()) {
    if (i <= 0) i = queue.length;
    // Get the next node
    let node = queue.dequeue();
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
        

        // Add the neighbor to the queue
        queue.enqueue(neighbors[i]);
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

export default bfsPathing;
