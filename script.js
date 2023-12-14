import { tileSets, getRotations } from "./tile-sets.js";
import { generate } from "./grid-generation.js";

const TILE_SIZE = 30;
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

let tileSet = tileSets[tilesetSelect.value].slice();
tileSet = tileSet.concat(getRotations(tileSet));

drawTileset(tileSet);

tilesetSelect.addEventListener("change", () => {
  tileSet = tileSets[tilesetSelect.value].slice();
  tileSet = tileSet.concat(getRotations(tileSet));
  drawTileset(tileSet);
});

generateButton.addEventListener("click", () => {
  let gridWidth = gridWidthInput.value;
  grid = generate(tileSet, gridWidth);
  drawGrid(gridWidth, TILE_SIZE);
});

function drawGrid(gridWidth, TILE_SIZE) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  //const tileWidth = grid[0][0].length;
  const tileWidth = 3;

  canvas.width = gridWidth * TILE_SIZE;
  canvas.height = gridWidth * TILE_SIZE;

  for (let i = 0; i < gridWidth; i++) {
    for (let j = 0; j < gridWidth; j++) {
      for (let k = 0; k < tileWidth; k++) {
        for (let l = 0; l < tileWidth; l++) {
          ctx.fillStyle = grid[i][j][k][l];
          ctx.fillRect(
            j * TILE_SIZE + (l * TILE_SIZE) / tileWidth,
            i * TILE_SIZE + (k * TILE_SIZE) / tileWidth,
            TILE_SIZE / tileWidth,
            TILE_SIZE / tileWidth
          );
        }
      }
    }
  }

  document.getElementById("grid-img").src = canvas.toDataURL();
}

function drawTileset() {
  const tilesContainer = document.getElementById("tiles");
  while (tilesContainer.firstChild) {
    tilesContainer.removeChild(tilesContainer.firstChild);
  }

  for (const tile of tileSet) {
    const tileCanvas = document.createElement("canvas");
    tileCanvas.classList.add("tile-canvas");
    tilesContainer.appendChild(tileCanvas);

    const ctx = tileCanvas.getContext("2d");
    const tileWidth = tile[0].length;
    tileCanvas.width = TILE_SIZE;
    tileCanvas.height = TILE_SIZE;
    for (let i = 0; i < tileWidth; i++) {
      for (let j = 0; j < tileWidth; j++) {
        ctx.fillStyle = tile[i][j];
        ctx.fillRect(
          (j * TILE_SIZE) / tileWidth,
          (i * TILE_SIZE) / tileWidth,
          TILE_SIZE / tileWidth,
          TILE_SIZE / tileWidth
        );
      }
    }
  }
}
