import { set1 } from "./tile-sets.js";

let tileSet = set1;
let gridWidth = 10;
let tileSize = 30;
let grid = [];

for (let i = 0; i < gridWidth; i++) {
  grid.push([]);
  for (let j = 0; j < gridWidth; j++) {
    if (isTileValid(tileSet[0], j, i, tileSet[0].length)) {
      grid[i].push(tileSet[0]);
    }
  }
}

drawGrid();

function isTileValid(tile, x, y, width) {
  if (y > 0) {
    const top = grid[y - 1][x];

    if (top) {
      for (let i = 0; i < width; i++) {
        if (top[width - 1][i] !== tile[0][i]) {
          return false;
        }
      }
    }
  }

  if (x > 0) {
    const left = grid[y][x - 1];

    if (left) {
      for (let i = 0; i < width; i++) {
        if (left[i][width - 1] !== tile[i][0]) {
          return false;
        }
      }
    }
  }

  return true;
}

function drawGrid() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const tileWidth = grid[0][0].length;

  canvas.width = gridWidth * tileSize;
  canvas.height = gridWidth * tileSize;

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

  document.getElementById("grid-img").src = canvas.toDataURL();
}
