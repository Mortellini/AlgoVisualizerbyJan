import sleep from "../../generalSupport/sleep.js";

async function getPath(endNode, options, drawGrid) {
  let path = [];
  let currentNode = endNode;

  while (currentNode.parent != null) {
    path.push(currentNode);
    currentNode = currentNode.parent;
    if (currentNode.state != 1) {
      currentNode.state = 5;
    }
    drawGrid();
    await sleep(options.delay);
  }

  return path;
}

export default getPath;