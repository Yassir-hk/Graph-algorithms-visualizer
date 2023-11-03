import { grid } from "../grid.js";
import { animateVisitedNode } from "../utility/utils.js";

export async function depthFirstSearch(adjList, start, target) {
  const visited = new Set();
  const stack = [start]

  while (stack.length) {
    const current = stack.pop();

    visited.add(current);
    await animateVisitedNode(current);

    // Case of reaching the target node
    if (target === current) {
      return true;
    }

    // Add unexplored nodes which are neighbors to the current node
    for (const neighbor of adjList[current]) {
      if (!visited.has(neighbor) && !grid.wallNodes.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return false;
}
