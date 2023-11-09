import { NODE_ANIMATIONS } from "./consts.js";

// Apply visited node animation
export function animateVisitedNode(id) {
  return new Promise((resolve) => {
    const node = document.getElementById(id);
    node.style.animation = NODE_ANIMATIONS.VISITING;
    setTimeout(() => resolve(), 0);
  });
}

export function animateTwoVisitedNodes(idOne, idTwo) {
  return new Promise((resolve) => {
    const nodeOne = document.getElementById(idOne);
    const nodeTwo = document.getElementById(idTwo);
    nodeOne.style.animation = NODE_ANIMATIONS.VISITING;
    nodeTwo.style.animation = NODE_ANIMATIONS.VISITING;
    setTimeout(() => resolve(), 0);
  });
}

// Apply path node animation
export function animatePathNode(id) {
  return new Promise((resolve) => {
    const node = document.getElementById(id);
    node.style.animation = NODE_ANIMATIONS.PATH;
    setTimeout(() => {resolve()}, 30);
  });
}

// Function that takes a list of visualizations and apply theme
export async function animate(visualisations) {
  for (const visualisation of visualisations) {
    if (visualisation.type === "visited")
      await animateVisitedNode(visualisation.node);
    else
      await animatePathNode(visualisation.node);
  }
}