import { grid } from "../grid.js";

export function dijkstra(adjList, start, target) {
  const graphSize = adjList.length;
  const nodes = new Map();
  const animations = [];

  // Constructing nodes map to represent all valid nodes to be processed
  for (let i = 0; i < adjList.length; ++i) {
    if (grid.wallNodes.has(i)) continue;
    nodes.set(i, {prev: undefined, cost: Infinity});
  }

  nodes.set(start, {prev: undefined, cost: 0});
  const visited = new Set();

  while (visited.size !== graphSize) {
    const current = {
      node: undefined,
      cost: Infinity,
    };

    // Finding the unvisited node with the smallest cost
    for (const [node, infos] of nodes) {
      if ((!visited.has(node) && infos.cost < current.cost) || infos.node === target) {
        current.node = node;
        current.cost = infos.cost + 1;
      }
    }

    if (current.node === undefined) {
      break;
    }

    // Mark node as visited
    visited.add(current.node);
    animations.push({type: "visited", node: current.node})

    // Case of reaching the target node
    if (current.node === target) {
      const path = [];
      let node = target;

      while (node !== undefined) {
        path.unshift(node);
        node = nodes.get(node).prev;
      }

      for (const node of path) {
        animations.push({type: "path", node: node});
      }

      break;
    }

    // Explore neighbors nodes and update the cost of the node if necessary
    for (const neighbor of adjList[current.node]) {
      if (grid.wallNodes.has(neighbor) || visited.has(neighbor)) continue;
      if (current.cost < nodes.get(neighbor).cost) {
        nodes.set(neighbor, {prev: current.node, cost: current.cost});
      }
    }
  }

  return animations;
}
