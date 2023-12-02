import { tileSets } from "./tile-sets.js";
import { generate } from "./grid-generation.js";

let tileSet;
let gridWidth = 10;
let tileSize = 30;
let grid = [];

const tilesetSelect = document.getElementById("tileset-select");
const generateButton = document.getElementById("generate-button");

tileSets.forEach((tileSet, index) => {
  let option = document.createElement("option");
  option.value = index;
  option.textContent = `Tileset ${index + 1}`;
  tilesetSelect.appendChild(option);
});

generateButton.addEventListener("click", () => {
  tileSet = tileSets[tilesetSelect.value];
  generate(grid, tileSet, gridWidth, tileSize);
});
