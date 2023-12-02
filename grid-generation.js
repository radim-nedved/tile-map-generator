function generate(grid, tileSet, gridWidth) {
  let rotatedTiles = [];
  for (let i = 0; i < tileSet.length; i++) {
    let tile = tileSet[i];
    const tileWidth = tile.length;

    for (let j = 0; j < tileWidth; j++) {
      tile = rotateTile(tile);
      rotatedTiles.push(tile);
    }
  }
  tileSet = [...tileSet, ...rotatedTiles];

  grid = [];

  for (let i = 0; i < gridWidth; i++) {
    grid.push([]);
    for (let j = 0; j < gridWidth; j++) {
      grid[i].push([]);
    }
  }

  placeTile(grid, tileSet, 0, 0, gridWidth);
  return grid;
}

function placeTile(grid, tileSet, x, y, width) {
  if (y == width) {
    return true;
  }

  let newX = x + 1 < width ? x + 1 : 0;
  let newY = x + 1 < width ? y : y + 1;

  const tiles = tileSet.slice();
  shuffleArray(tiles);

  for (const tile of tiles) {
    if (isTileValid(grid, tile, x, y, 3)) {
      grid[y][x] = tile;
      if (placeTile(grid, tileSet, newX, newY, width)) {
        return true;
      }
    }

    grid[y][x] = null;
  }
  console.log(tileSet);

  return false;
}

function isTileValid(grid, tile, x, y, width) {
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

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function rotateTile(tile) {
  const tileWidth = tile.length;
  const newTile = [];

  for (let i = 0; i < tileWidth; i++) {
    newTile.push([]);
    for (let j = 0; j < tileWidth; j++) {
      newTile[i].push(tile[tileWidth - j - 1][i]);
    }
  }

  return newTile;
}

export { generate };
