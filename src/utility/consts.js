
export const NODE_COLORS = {
  "PATH": "var(--path-node)",
  "WALL": "var(--wall-node)",
  "VISITED": "var(--visited)",
  "CURRENT": "var(--current)",
};

export const NODE_ANIMATIONS = {
  "ICONS": "icon-animation 1s",
  "PATH": "path-node-animation 1.5s linear forwards",
  "VISITING": "visited-node-animation 2s linear forwards",
}

export const NODE_ICONS = {
  "START": "<img id='start-node-icon' src='assets/img/arrow.png' alt='S' width='90%' draggable=true>",
  "TARGET": "<img id='target-node-icon' src='assets/img/circle.png' alt='T' width='90%' draggable=true>",
}
