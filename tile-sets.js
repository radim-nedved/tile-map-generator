const set1 = [
  [
    ["black", "black", "black"],
    ["darkslateblue", "darkslateblue", "darkslateblue"],
    ["black", "black", "black"],
  ],
  [
    ["black", "black", "black"],
    ["darkslateblue", "darkslateblue", "black"],
    ["black", "darkslateblue", "black"],
  ],
  [
    ["black", "black", "black"],
    ["black", "darkslateblue", "black"],
    ["black", "black", "black"],
  ],
  [
    ["black", "darkslateblue", "black"],
    ["black", "darkslateblue", "black"],
    ["black", "black", "black"],
  ],
  [
    ["black", "black", "black"],
    ["darkslateblue", "darkslateblue", "darkslateblue"],
    ["black", "darkslateblue", "black"],
  ],
  [
    ["black", "black", "black"],
    ["darkslateblue", "darkslateblue", "darkslateblue"],
    ["darkslateblue", "darkslateblue", "black"],
  ],
  [
    ["black", "black", "black"],
    ["black", "black", "black"],
    ["black", "black", "black"],
  ],
];

const set2 = [
  [
    ["black", "black", "black"],
    ["black", "black", "black"],
    ["black", "black", "black"],
  ],
  [
    ["black", "yellow", "black"],
    ["black", "yellow", "black"],
    ["black", "yellow", "black"],
  ],
  [
    ["black", "black", "black"],
    ["yellow", "yellow", "black"],
    ["black", "yellow", "black"],
  ],
  [
    ["black", "red", "black"],
    ["black", "red", "black"],
    ["black", "red", "black"],
  ],
  [
    ["black", "black", "black"],
    ["red", "red", "black"],
    ["black", "red", "black"],
  ],
  [
    ["black", "green", "black"],
    ["black", "green", "black"],
    ["black", "green", "black"],
  ],
  [
    ["black", "black", "black"],
    ["green", "green", "black"],
    ["black", "green", "black"],
  ],
  [
    ["black", "red", "black"],
    ["green", "green", "green"],
    ["black", "red", "black"],
  ],
  [
    ["black", "yellow", "black"],
    ["green", "green", "green"],
    ["black", "yellow", "black"],
  ],
  [
    ["black", "green", "black"],
    ["yellow", "yellow", "yellow"],
    ["black", "green", "black"],
  ],
  [
    ["black", "green", "black"],
    ["red", "red", "red"],
    ["black", "green", "black"],
  ],
];

const tileSets = [set1, set2, set3];

function getRotations(tileSet) {
  let rotatedTiles = [];
  for (let i = 0; i < tileSet.length; i++) {
    let tile = tileSet[i];
    for (let j = 0; j < 3; j++) {
      tile = rotateTile(tile);
      let tileString = JSON.stringify(tile);
      //check for duplicates
      if (!rotatedTiles.some((t) => JSON.stringify(t) === tileString)) {
        if (!tileSet.some((t) => JSON.stringify(t) === tileString)) {
          rotatedTiles.push(tile);
        }
      }
    }
  }

  return rotatedTiles;
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

export { tileSets, getRotations };
