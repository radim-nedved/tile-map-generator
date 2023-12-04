import { tileSets } from "./tile-sets.js";
import { generate } from "./grid-generation.js";

let tileSize = 30;
let grid = [];

const tilesetSelect = document.getElementById("tileset-select");
const gridWidthInput = document.getElementById("grid-width");
const generateButton = document.getElementById("generate-button");

tileSets.forEach((tileSet, index) => {
  let option = document.createElement("option");
  option.value = index;
  option.textContent = `Tileset ${index + 1}`;
  tilesetSelect.appendChild(option);
});

generateButton.addEventListener("click", () => {
  let tileSet = tileSets[tilesetSelect.value];
  let gridWidth = gridWidthInput.value;
  grid = generate(tileSet, gridWidth, tileSize);
  drawGrid(gridWidth, tileSize);
});

function drawGrid(gridWidth, tileSize) {
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
