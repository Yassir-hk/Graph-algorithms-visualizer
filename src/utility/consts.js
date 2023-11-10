
export const NODE_COLORS = {
  "PATH": "var(--path-node)",
  "WALL": "var(--wall-node)",
  "VISITED": "var(--visited)",
  "CURRENT": "var(--current)",
};

export const NODE_ANIMATIONS = {
  "PATH": "path-node-animation 2s ease-out alternate 1 forwards running",
  "VISITING": "visited-node-animation 3s ease-out alternate 1 forwards running",
}

export const NODE_ICONS = {
  "START": "<img id='start-node-icon' src='assets/img/arrow.png' alt='S' width='90%' draggable=true>",
  "TARGET": "<img id='target-node-icon' src='assets/img/circle.png' alt='T' width='90%' draggable=true>",
}
