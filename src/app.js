import { grid } from "./grid.js";
import { astar } from "./algorithms/astar.js";
import { dijkstra } from "./algorithms/dijkstra.js";
import { depthFirstSearch } from "./algorithms/dfs.js";
import { breadthFirstSearch } from "./algorithms/bfs.js";
import { bidirectional } from "./algorithms/bidirectional.js";
import { animate } from "./utility/utils.js";

const visualizeButton = document.getElementById("visualize-button");
const clearPathsButton = document.getElementById("clear-paths-button");
const restoreGridButton = document.getElementById("restore-grid-button");
export let isAlgorithmRunning = false;

// Set up event handlers for button clicks
restoreGridButton.onclick = () => {
  if (isAlgorithmRunning) return;
  grid.restore();
}

// Clearing all marked nodes (visited, path) from the grid
clearPathsButton.onclick = () => {
  if (isAlgorithmRunning) return;
  grid.clearPaths();
}

// Visualizing the picked algorithm
visualizeButton.onclick = async () => {
  if (isAlgorithmRunning) return;
  isAlgorithmRunning = true;
  visualizeButton.style.background = "var(--visualize-button-disabled)";

  const select = document.getElementById("algorithms");
  const selectedAlgorithm = select.options[select.selectedIndex].value;
  const adjList = grid.getAdjList();

  grid.clearPaths();

  const algorithmCompleted = async () => {
    isAlgorithmRunning = false;
    visualizeButton.style.background = "var(--visualize-button-enabled)";
  };

  let animations;

  switch (selectedAlgorithm) {
    case "ast":
      animations = astar(adjList, grid.startNode, grid.targetNode);
      break;
    case "dij":
      animations = dijkstra(adjList, grid.startNode, grid.targetNode);
      break;
    case "bid":
      animations = bidirectional(adjList, grid.startNode, grid.targetNode);
      break;
    case "dfs":
      animations = depthFirstSearch(adjList, grid.startNode, grid.targetNode);
      break;
    case "bfs":
      animations = breadthFirstSearch(adjList, grid.startNode, grid.targetNode);
  }

  await animate(animations);
  await algorithmCompleted();
};

grid.draw();
