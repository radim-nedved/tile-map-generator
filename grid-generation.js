let gridWidth;

function generate(tileSet, gridSize) {
  let grid = [];
  for (let i = 0; i < gridSize; i++) {
    grid.push([]);
  }

  gridWidth = grid.length;

  placeTile(grid, tileSet, 0, 0, gridWidth);
  return grid;
}

function placeTile(grid, tileSet, x, y) {
  if (y == gridWidth) {
    return true;
  }

  let newX = x + 1 < gridWidth ? x + 1 : 0;
  let newY = x + 1 < gridWidth ? y : y + 1;

  //copy by value
  const tiles = tileSet.slice();
  shuffleArray(tiles);

  for (const tile of tiles) {
    if (isTileValid(grid, tile, x, y, 3)) {
      grid[y][x] = tile;
      if (placeTile(grid, tileSet, newX, newY)) {
        return true;
      }
    }
    grid[y][x] = null;
  }

  return false;
}

function isTileValid(grid, tile, x, y, tileWidth) {
  if (y > 0) {
    const top = grid[y - 1][x];

    if (top) {
      for (let i = 0; i < tileWidth; i++) {
        if (top[tileWidth - 1][i] !== tile[0][i]) {
          return false;
        }
      }
    }
  }

  if (x > 0) {
    const left = grid[y][x - 1];

    if (left) {
      for (let i = 0; i < tileWidth; i++) {
        if (left[i][tileWidth - 1] !== tile[i][0]) {
          return false;
        }
      }
    }
  }

  return true;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export { generate };
