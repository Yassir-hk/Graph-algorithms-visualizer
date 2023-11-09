import { grid } from "../grid.js";

export function depthFirstSearch(adjList, start, target) {
  const visited = new Set();
  const stack = [start]
  const animations = [];

  while (stack.length) {
    const current = stack.pop();

    visited.add(current);
    animations.push({type: "visited", node: current})

    // Case of reaching the target node
    if (target === current) {
      break;
    }

    // Add unexplored nodes which are neighbors to the current node
    for (const neighbor of adjList[current]) {
      if (!visited.has(neighbor) && !grid.wallNodes.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return animations;
}
