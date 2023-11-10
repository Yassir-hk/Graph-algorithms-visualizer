import { isAlgorithmRunning } from "./app.js";
import { NODE_ANIMATIONS, NODE_COLORS, NODE_ICONS } from "./utility/consts.js";

export const gridElement = document.getElementById("grid");

class Grid {
  constructor() {
    this.cols = 55;
    this.rows = 25;

    this.startNode = this.cols * Math.floor(this.rows / 2) + Math.floor(this.cols * 0.25);
    this.targetNode = this.startNode + this.cols - 2 * (this.startNode % this.cols);

    this.isActivatedDrawing = false;
    this.wallNodes = new Set();
    this.pickedIcon = null;

    // Constructing the layout of the grid
    gridElement.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    gridElement.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
  }

  // Constructing the adjacency matrix
  getAdjList() {
    const graphSize = this.cols * this.rows;
    const adjList = new Array(graphSize);

    for (let i = 0; i < graphSize; ++i) {
      adjList[i] = [];
      
      // Up node
      if (i - this.cols >= 0 && !this.wallNodes.has(i - this.cols)) {
        adjList[i].push(i - this.cols);
      }
      
      // Left node
      if (i % this.cols && !this.wallNodes.has(i - 1)) {
        adjList[i].push(i - 1);
      }

      // Bottom node
      if (i + this.cols < graphSize && !this.wallNodes.has(i + this.cols)) {
        adjList[i].push(i + this.cols);
      }

      // Right node
      if ((i + 1) % this.cols && !this.wallNodes.has(i + 1)) {
        adjList[i].push(i + 1);
      }
    }

    return adjList;
  }
  
  // Clearing the grid
  clear() {
    while (gridElement.firstChild) {
      gridElement.removeChild(gridElement.firstChild);
    }
  }

  // Clearing all marked nodes (visited, path)
  clearPaths() {
    const nodes = document.getElementsByClassName("node");
    for (const node of nodes) {
      node.style.animation = null;
    }
  }

  // Drawing the grid
  draw() {
    if (gridElement.firstChild) {
      this.clearPaths();
      return;
    }
    
    const gridSize = this.cols * this.rows;
    for (let i = 0; i < gridSize; ++i) {
      gridElement.appendChild(this.createNode(i));
    }
    
    // Add drag and drop event listener to startNode and targetNode
    const startNodeIcon = document.getElementById(this.startNode).firstChild;
    const targetNodeIcon = document.getElementById(this.targetNode).firstChild;

    startNodeIcon.addEventListener("dragstart", (e) => {
      if (isAlgorithmRunning) return;
      this.pickedIcon = startNodeIcon;
    });

    targetNodeIcon.addEventListener("dragstart", (e) => {
      if (isAlgorithmRunning) return;
      this.pickedIcon = targetNodeIcon;
    });
  }

  // Drawing a wall
  drawWall(id) {
    if (id === this.startNode || id === this.targetNode || isAlgorithmRunning) {
      return;
    }

    const node = document.getElementById(id);
    node.style.animation = null;

    if (node.style.backgroundColor === NODE_COLORS.WALL) {
      node.style.backgroundColor = null;
      this.wallNodes.delete(id);
    } else {
      node.style.backgroundColor = NODE_COLORS.WALL;
      this.wallNodes.add(id);
    }
  }

  // Create a node element and assign an id to it
  createNode(id) {
    const node = document.createElement("div");
    node.draggable = true;

    // Add start node and target node icons
    if (this.startNode === id) {
      node.innerHTML = NODE_ICONS.START;
    } else if (this.targetNode === id) {
      node.innerHTML = NODE_ICONS.TARGET;
    }

    // Drag drop event
    node.ondragover = (e) => e.preventDefault();

    node.ondrop = (e) => {
      // Case of dropping in a occupied node
      if (e.target.firstChild || isAlgorithmRunning) return;
      const targetId = parseInt(e.target.id);
      
      // Knowing which icon is dropped
      if (this.pickedIcon.id === "start-node-icon") {
        this.startNode = targetId;
      } else if (this.pickedIcon.id === "target-node-icon") {
        this.targetNode = targetId;
      }
      
      // Case of dropping in a wall node
      if (this.wallNodes.has(targetId)) {
        this.wallNodes.delete(targetId);
      }
      
      // Dropping the icon into the node and remove any mark from that node
      e.target.append(this.pickedIcon);
      e.target.style.backgroundColor = null;
      this.pickedIcon = null;
    }

    // Activate drawing wall nodes
    node.onclick = () => {
      if (isAlgorithmRunning) return;
      this.isActivatedDrawing = !this.isActivatedDrawing;
    }

    // Handle drawing wall nodes
    node.onmouseover = () => {
      if (this.isActivatedDrawing && !isAlgorithmRunning) {
        this.drawWall(id);
      }
    }

    node.classList.add("node");
    node.id = id;

    return node;
  }

  // Function to restore all default configs
  restore() {
    this.clear();

    this.startNode = this.cols * Math.floor(this.rows / 2) + Math.floor(this.cols * 0.25);
    this.targetNode = this.startNode + this.cols - 2 * (this.startNode % this.cols);
    
    this.wallNodes = new Set();
    this.isActivatedDrawing = false;
    
    this.draw();
  }
}

export const grid = new Grid();
