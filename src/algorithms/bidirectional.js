import { grid } from "../grid.js";

// Check if two nodes are same
function areSameNode(a, b) {
  return a !== undefined && b !== undefined && a === b;
}

// Implementation of the bidirectional search algorithm
export function bidirectional(adjList, start, target) {
  const animations = [];
  const graphSize = adjList.length;
  const agentOneNodes = new Map();
  const agentTwoNodes = new Map();
  const agentOneVisitedNodes = new Set();
  const agentTwoVisitedNodes = new Set();

  // Initializing agents nodes
  for (let node = 0; node < graphSize; ++node) {
    if (grid.wallNodes.has(node)) continue;
    agentOneNodes.set(node, {prev: undefined, cost: Infinity});
    agentTwoNodes.set(node, {prev: undefined, cost: Infinity});
  }

  agentOneNodes.set(start, {prev: undefined, cost: 0});
  agentTwoNodes.set(target, {prev: undefined, cost: 0});

  while (agentOneVisitedNodes.size < graphSize) {
    const agentOneCurrentNode = {node: undefined, cost: Infinity};
    const agentTwoCurrentNode = {node: undefined, cost: Infinity};

    // Search for unexplored node with minimum cost for AgentOne
    for (const [node, infos] of agentOneNodes) {
      if (agentOneVisitedNodes.has(node)) continue;
      if (infos.cost < agentOneCurrentNode.cost) {
        agentOneCurrentNode.node = node;
        agentOneCurrentNode.cost = infos.cost + 1;
      }
    }

    if (agentOneCurrentNode.node === undefined) {
      break;
    }

    // Mark explored node as visited
    agentOneVisitedNodes.add(agentOneCurrentNode.node);
    animations.push({type: "visited", node: agentOneCurrentNode.node});

    // Search for unexplored node with minimum cost for AgentTwo
    for (const [node, infos] of agentTwoNodes) {
      if (agentTwoVisitedNodes.has(node)) continue;
      if (infos.cost < agentTwoCurrentNode.cost) {
        agentTwoCurrentNode.node = node;
        agentTwoCurrentNode.cost = infos.cost + 1;
      }
    }

    if (agentTwoCurrentNode.node === undefined) {
      break;
    }

    // Mark explored node as visited
    agentTwoVisitedNodes.add(agentTwoCurrentNode.node);
    animations.push({type: "visited", node: agentTwoCurrentNode.node});

    // Check if there are common visited nodes
    for (const node of agentOneVisitedNodes) {
      if (agentTwoVisitedNodes.has(node)) {
        agentOneCurrentNode.node = node;
        agentTwoCurrentNode.node = node;
        break;
      }
    }

    // Case of finding a common node
    if (areSameNode(agentOneCurrentNode.node, agentTwoCurrentNode.node)) {
      let node = agentOneCurrentNode.node;
      const path = [];

      while (node !== undefined) {
        path.unshift(node);
        node = agentOneNodes.get(node).prev;
      }

      node = agentTwoCurrentNode.node;
      while (node !== undefined) {
        path.push(node);
        node = agentTwoNodes.get(node).prev;
      }

      for (const node of path) {
        animations.push({type: "path", node: node});
      }

      break;
    }

    // Extracting neighbor nodes of AgentOne and update the cost of each of theme if necessary
    for (const neighbor of adjList[agentOneCurrentNode.node]) {
      if (grid.wallNodes.has(neighbor) || agentOneVisitedNodes.has(neighbor)) continue;
      if (agentOneCurrentNode.cost < agentOneNodes.get(neighbor).cost) {
        agentOneNodes.set(neighbor, {prev: agentOneCurrentNode.node, cost: agentOneCurrentNode.cost});
      }
    }

    // Extracting neighbor nodes of AgentTwo and update the cost of each of theme if necessary
    for (const neighbor of adjList[agentTwoCurrentNode.node]) {
      if (grid.wallNodes.has(neighbor) || agentTwoVisitedNodes.has(neighbor)) continue;
      if (agentTwoCurrentNode.cost < agentTwoNodes.get(neighbor).cost) {
        agentTwoNodes.set(neighbor, {prev: agentTwoCurrentNode.node, cost: agentTwoCurrentNode.cost});
      }
    }
  }

  return animations;
}
