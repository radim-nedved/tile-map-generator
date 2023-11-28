import { set1 } from "./tile-sets.js";

let tileSet = set1;
let gridWidth = 3;
let tileSize = 50;
let grid = [];

for (let i = 0; i < gridWidth; i++) {
  grid.push([]);
  for (let j = 0; j < gridWidth; j++) {
    grid[i].push(tileSet[0]);
  }
}

drawGrid();

function drawGrid() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const tileWidth = grid[0][0].length;

  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridWidth; j++) {
      for (let k = 0; k < tileWidth; k++) {
        for (let l = 0; l < tileWidth; l++) {
          ctx.fillStyle = grid[i][j][k][l];
          ctx.fillRect(
            j * tileSize + (l * tileSize) / tileWidth,
            i * tileSize + (k * tileSize) / tileWidth,
            tileSize / tileWidth,
            tileSize / tileWidth
          );
        }
      }
    }
  }
}
