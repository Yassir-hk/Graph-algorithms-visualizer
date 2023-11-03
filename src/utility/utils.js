import { NODE_ANIMATIONS } from "./consts.js";

// Apply visited node animation
export function animateVisitedNode(id) {
  return new Promise((resolve) => {
    const node = document.getElementById(id);
    node.style.animation = NODE_ANIMATIONS.VISITING;
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
