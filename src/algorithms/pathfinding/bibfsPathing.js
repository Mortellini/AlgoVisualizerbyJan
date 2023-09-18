import Queue from "./support/queue.js";
import getNeighbors from "./support/getNeighbors.js";
import getBiPath from "./support/getBiPath.js";
import sleep from "../generalSupport/sleep.js";

async function bibfsPathing(grid, start, end, options, drawGrid) {
  // Create a queue
  let startQueue = new Queue();
  let endQueue = new Queue();

  // Add the start node to the queue
  startQueue.enqueue(start);
  endQueue.enqueue(end);

  let i = startQueue.length;
  // While the queue is not empty
  while (!startQueue.isEmpty() || !endQueue.isEmpty()) {
    //Search from start
    if(!startQueue.isEmpty()) {
      if (i <= 0) i = startQueue.length;
      // Get the next node
      let node = startQueue.dequeue();
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
          startQueue.enqueue(neighbors[i]);
        }
        else if (neighbors[i].state == 2 || (neighbors[i].state == 3 && neighbors[i].child!=null)) {
          neighbors[i].parent = node;
          return getBiPath(neighbors[i], options, drawGrid);
        }
        
        drawGrid();
        if (!options.onlyDelayOuterLoop) await sleep(options.delay);

      }

      if (node.state == 4) node.state = 3;
      i--;
    }

    // Search from end
    if(!endQueue.isEmpty()) {
      // Get the next node
      let node = endQueue.dequeue();
      // Get the neighbors of the node
      let neighbors = getNeighbors(grid, node, options.diagonalPathing);
      // For each neighbor
      for (let i = 0; i < neighbors.length; i++) {
        // If the neighbor has not been visited
        if (neighbors[i].state == 0 || (neighbors[i].state == 4 && neighbors[i].distance > node.distance + 1)) {
          // Set the neighbor's parent to the current node
          neighbors[i].child = node;

          // Set the neighbor as visited
          neighbors[i].state = 4;
          // Set the neighbor's distance to the current node's distance + 1
          neighbors[i].distance = node.distance + 1;
          

          // Add the neighbor to the queue
          endQueue.enqueue(neighbors[i]);
        }
        else if (neighbors[i].state == 1 || (neighbors[i].state == 3 && neighbors[i].parent!=null)) {
          neighbors[i].child = node;
          return getBiPath(neighbors[i], options, drawGrid);
        }

        drawGrid();
        if (!options.onlyDelayOuterLoop) await sleep(options.delay);

      }

      if (node.state == 4) node.state = 3;
    }

    drawGrid();
    if (i==0) await sleep(options.delay);
  }


  // If no path is found, return null
  return null;
}

export default bibfsPathing;
