# ALD - Semestrální práce

## Popis algoritmu: 

Aplikace pro generování světa využívá rekurzivní backtracking.

Na začátku každého průchodu metodou je sada dlaždic náhodně zamíchána. Tím je zajištěna variabilita v generování.
Každý průchod metodou si pamatuje svojí vlastní zamíchanou sadu.

Metoda postupně zkouší dosadit všechny dlaždice z její unikátní sady na specifikované místo v rámci mřížky.

Při dosazování dlaždic je aplikováno jediné pravidlo: sousední dlaždice se mohou dotýkat pouze v případě, že souhlasí jejich barvy na dotýkajících se stranách.

Pokud nelze na aktuální pozici dosadit žádnou z dostupných dlaždic, algoritmus se vrátí o krok zpět. Odstraní předchozí dlaždici a znovu zkouší dosadit zbývající dlaždice z jeho unikátní sady.

Proces se opakuje, až do úplného vyplnění mřížky, nebo dokud se nevrátí na začátek, což znamená, že řešení neexistuje.

```js
function placeTile(grid, tileSet, x, y) {
  if (y == gridWidth) {
    return true;
  }

  let newX = x + 1 < gridWidth ? x + 1 : 0;
  let newY = x + 1 < gridWidth ? y : y + 1;

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
```

```js
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
```

![image](https://github.com/radim-nedved/tile-pattern-generator/assets/99030275/c17c00ed-5044-4457-acba-3ee023bf70ab)
