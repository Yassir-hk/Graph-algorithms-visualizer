import { grid } from "../grid.js";

// Heuristic function that estimate the Manhattan distance from a node to b node
function distance(a, b) {
  if (isNaN(a) || isNaN(b)) {
    return Infinity;
  }

  const ax = a % grid.cols, ay = Math.floor(a / grid.rows);
  const bx = b % grid.cols, by = Math.floor(b / grid.rows);
  
  return Math.abs(ax - bx) + Math.abs(ay - by);
}

// Implementation of the A* search algorithm
export function astar(adjList, start, target) {
  const closedList = new Map();
  const openList = new Map();
  const visualisations = [];

  openList.set(start, {
    prev: undefined,
    cost: 0,
    dist: distance(start, target),
  });

  while (openList.size) {
    const current = {
      node: undefined,
      prev: undefined,
      dist: Infinity,
      cost: Infinity,
    };

    // Extracting the node with the lowest estimate
    for (const [node, infos] of openList) {
      if (infos.dist + infos.cost < current.cost + current.dist) {
        current.node = node;
        current.prev = infos.prev;
        current.dist = infos.dist;
        current.cost = infos.cost + 1;
      }
    }

    // Case of invalid node available
    if (current.node === undefined) {
      break;
    }

    openList.delete(current.node);
    closedList.set(current.node, {
      prev: current.prev,
      cost: current.cost,
      dist: current.dist,
    });

    // Animate visited node
    visualisations.push({type: "visited", node: current.node});

    // Case of reaching the target node
    if (current.node === target) {
      let node = target;
      const path = [];
      
      while (node !== undefined) {
        path.unshift(node);
        node = closedList.get(node).prev;
      }

      // Animate path nodes
      for (const node of path) {
        visualisations.push({type: "path", node: node});
      }

      break;
    }

    // Add neighbor nodes
    for (const neighbor of adjList[current.node]) {
      if (grid.wallNodes.has(neighbor) || closedList.has(neighbor)) {
        continue;
      }
 
      const dist = distance(neighbor, target);
      const node = openList.get(neighbor);

      // Insert neighbor node to the open list in case of a better estimate or if it's not exist
      if (!node || dist + current.cost <= node.dist + node.cost) {
        openList.set(neighbor, {
          prev: current.node,
          cost: current.cost,
          dist: dist,
        });
      }
    }
  }

  return visualisations;
}
