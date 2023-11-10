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
export async function animate(animations) {
  for (const animation of animations) {
    if (animation.type === "visited") {
      await animateVisitedNode(animation.node);
    } else {
      await animatePathNode(animation.node);
    }
  }
}

// Animate the result of the bidirectional algorithm
export async function animateBidirectional(animations) {
  for (let i = 1; i < animations.length; ++i) {
    if (animations[i].type === "visited") {
      await animateTwoVisitedNodes(animations[i].node, animations[i - 1].node);
    } else {
      await animatePathNode(animations[i].node);
    }
  }
}