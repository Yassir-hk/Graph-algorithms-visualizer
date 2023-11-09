import { grid } from "../grid.js";
import { animateVisitedNode } from "../utility/utils.js";

// Breadth first search algorithms
export function breadthFirstSearch(adjList, start, target) {
  const animations = [];
  const queue = [start];
  const visited = new Set();
  
  while (queue.length) {
    const current = queue.shift();

    visited.add(current);
    animations.push({type: "visited", node: current});

    // Case of reaching the target node
    if (target === current) {
      break;
    }

    // Add the unexplored nodes which they are neighbors to the current node
    for (const neighbor of adjList[current]) {
      if (!visited.has(neighbor) && !grid.wallNodes.has(neighbor)) {
        queue.push(neighbor);
        visited.add(neighbor);
      }
    }
  }

  return animations;
}
