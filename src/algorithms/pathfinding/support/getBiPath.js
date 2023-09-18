import sleep from "../../generalSupport/sleep.js";

async function getBiPath(intersection, options, drawGrid) {
  let path = [];
  let forwardNode = intersection;
  let backwardNode = intersection;
  intersection.state = 5;

  // Get the path from the intersection to the end
  while (forwardNode.child != null) {
    path.push(forwardNode);
    forwardNode = forwardNode.child;
    if (forwardNode.state == 4 || forwardNode.state == 3) {
        forwardNode.state = 5;
    }
    drawGrid();
    await sleep(options.delay);
  }

  // Get the path from the intersection to the start
  while (backwardNode.parent != null) {
    path.push(backwardNode);
    backwardNode = backwardNode.parent;
    if (backwardNode.state == 4 || backwardNode.state == 3) {
        backwardNode.state = 5;
    }
    drawGrid();
    await sleep(options.delay);
  }
  return path;
}

export default getBiPath;