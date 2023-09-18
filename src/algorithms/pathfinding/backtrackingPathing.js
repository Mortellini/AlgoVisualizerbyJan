import Stack from "./support/stack.js";
import getNeighbors from "./support/getNeighbors.js";
import getPath from "./support/getPath.js";
import sleep from "../generalSupport/sleep.js";

async function backtrackingPathing(grid, start, end, options, drawGrid) {
  // Create a queue
  let stack = new Stack();

  // Add the start node to the stack
  stack.store(start);

  let i = stack.length;
  let lastNode = start;
  // While the queue is not empty
  while (!stack.isEmpty()) {
    if (i <= 0) i = stack.length;
    // Get the next node
    let node = stack.pop();
    if (node.state == 2) {
      drawGrid();
      return;
    }
    if (node.distance <= lastNode.distance) {
      retracePath(lastNode, node.parent);
      drawGrid();
    } 
    // Get the neighbors of the node
    let neighbors = getNeighbors(grid, node, options.diagonalPathing);
    // For each neighbor
    for (let i = 0; i < neighbors.length; i++) {
      // If the neighbor has not been visited
      if (neighbors[i].state == 0 || neighbors[i].state == 2) {
        // Set the neighbor's parent to the current node
        neighbors[i].parent = node;

        // Set the neighbor's distance to the current node's distance + 1
        neighbors[i].distance = node.distance + 1;
        

        // Add the neighbor to the stack
        stack.store(neighbors[i]);
      }
      
      drawGrid();
      if (!options.onlyDelayOuterLoop) await sleep(options.delay);

    }

    if (node.state == 0) node.state = 5;
    i--;

    drawGrid();
    if (i==0) await sleep(options.delay);
    lastNode = node;
  }

  // If no path is found, return null
  return null;
}

function retracePath(currentNode, startNode) {
  while (currentNode != startNode) {
    if (currentNode.state === 1) {
      return;
    }
    currentNode.state = 0;
    currentNode = currentNode.parent;
  }
}

export default backtrackingPathing;
