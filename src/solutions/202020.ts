import { find, isEqual } from 'lodash';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export type Tile = {
  id: number,
  cells: string[][],
  edges: Edges
};

type Edges = {
  top: string[],
  bottom: string[],
  left: string[],
  right: string[],
};

const getEdges = (input: string[]): Edges => {
  const top = input[0].split('');
  const bottom = input[input.length - 1].split('');
  const left = input.map(l => l.split('')[0]);
  const right = input.map(l => l.split('')[l.length - 1]);
  return { top, bottom, left, right };
};

const parseRawTile = (input: string): Tile => {
  const [title, ...image] = splitLines(input);
  const id = parseInt(title.slice(5, -1), 10);
  const cells = image.map(line => line.split(''));
  const edges = getEdges(image);
  return { id, cells, edges };
};

export const parseInput = (input: string): Tile[] => {
  const rawTiles = input.split(/\r?\n\r?\n/);
  return rawTiles.map(parseRawTile);
};

export const edgesMatch = (edgeOne: string[], edgeTwo: string[]): boolean => {
  return (isEqual(edgeOne, edgeTwo) || isEqual(edgeOne, edgeTwo.slice().reverse()));
};

export const findMatchingLeftEdge = (edge: String[], tiles: Tile[]): [Tile, number] | undefined => {
  for (let i = 0; i < tiles.length; i++) {

    if (isEqual(tiles[i].edges.top, edge)) return [flipTileVertically(rotateTileLeft(tiles[i])), 1];
    if (isEqual(tiles[i].edges.top.slice().reverse(), edge)) return [rotateTileLeft(tiles[i]), 2];

    if (isEqual(tiles[i].edges.bottom, edge)) return [rotateTileRight(tiles[i]), 3];
    if (isEqual(tiles[i].edges.bottom.slice().reverse(), edge)) return [flipTileVertically(rotateTileRight(tiles[i])), 4];

    if (isEqual(tiles[i].edges.left, edge)) return [tiles[i], 5];
    if (isEqual(tiles[i].edges.left.slice().reverse(), edge)) return [flipTileVertically(tiles[i]), 6];

    if (isEqual(tiles[i].edges.right, edge)) return [flipTileHorizontally(tiles[i]), 7];
    if (isEqual(tiles[i].edges.right.slice().reverse(), edge)) return [rotateTileLeft(rotateTileLeft(tiles[i])), 8];
  }
  return undefined;
};

export const findCorners = (tiles: Tile[]): Tile[] => {
  return tiles.filter(t => {
    const otherTiles = tiles.filter(tt => tt.id !== t.id);
    const topMatches = !!findMatchingLeftEdge(t.edges.top, otherTiles);
    const bottomMatches = !!findMatchingLeftEdge(t.edges.bottom, otherTiles);
    const leftMatches = !!findMatchingLeftEdge(t.edges.left, otherTiles);
    const rightMatches = !!findMatchingLeftEdge(t.edges.right, otherTiles);
    return (
      (topMatches && rightMatches && !leftMatches && !bottomMatches) ||
      (topMatches && !rightMatches && leftMatches && !bottomMatches) ||
      (!topMatches && rightMatches && !leftMatches && bottomMatches) ||
      (!topMatches && !rightMatches && leftMatches && bottomMatches)
    );
  });
};

export const flipTileHorizontally = ({ id, cells, edges: { top, bottom, left, right } }: Tile): Tile => {
  return ({
    id,
    cells: cells.map(l => l.slice().reverse()),
    edges: {
      top: top.slice().reverse(),
      bottom: bottom.slice().reverse(),
      left: right,
      right: left,
    }
  });
};

export const flipTileVertically = ({ id, cells, edges: { top, bottom, left, right } }: Tile): Tile => {
  return ({
    id,
    cells: cells.slice().reverse(),
    edges: {
      top: bottom,
      bottom: top,
      left: left.slice().reverse(),
      right: right.slice().reverse()
    }
  });
};

export const transposeTile = ({ id, cells, edges: { top, bottom, left, right } }: Tile): Tile => {
  const newCells: string[][] = [];
  for (let i = 0; i < cells.length; i++) {
    newCells[i] = [];
    for (let j = 0; j < cells[0].length; j++) {
      newCells[i][j] = cells[j][i];
    }
  }

  return ({
    id,
    cells: newCells,
    edges: {
      top: left,
      bottom: right,
      left: top,
      right: bottom,
    }
  });
};

export const rotateTileRight = (tile: Tile): Tile => {
  return flipTileHorizontally(transposeTile(tile));
};

export const rotateTileLeft = (tile: Tile): Tile => {
  return transposeTile(flipTileHorizontally(tile));
};

const alignTopLeft = (tiles: Tile[], tile: Tile): Tile => {
  const otherTiles = tiles.filter(tt => tt.id !== tile.id);
  const topMatches = !!findMatchingLeftEdge(tile.edges.top, otherTiles);
  const bottomMatches = !!findMatchingLeftEdge(tile.edges.bottom, otherTiles);
  const leftMatches = !!findMatchingLeftEdge(tile.edges.left, otherTiles);
  const rightMatches = !!findMatchingLeftEdge(tile.edges.right, otherTiles);

  if (topMatches && leftMatches) {
    return (rotateTileRight(rotateTileRight(tile)));
  } else if (topMatches) {
    return (rotateTileRight(tile));
  } else if (bottomMatches && leftMatches) {
    return (rotateTileLeft(tile));
  }
  return tile;
};

export const solveImage = (tiles: Tile[]): Tile[][] => {
  const dimension = Math.sqrt(tiles.length);
  const usedTiles = new Set<number>();
  const image: Tile[][] = [];
  const corners = findCorners(tiles);
  const topLeft = corners[0];
  usedTiles.add(topLeft.id);
  image[0] = [];
  image[0][0] = alignTopLeft(tiles, topLeft);

  for (let j = 1; j < dimension; j++) {
    const availableTiles = tiles.filter(t => !usedTiles.has(t.id));
    const [nextRight, idx] = findMatchingLeftEdge(image[0][j - 1].edges.right, availableTiles) ?? [];
    if (!nextRight) {
      throw new Error(`Can't find next ${j}`);
    }
    usedTiles.add(nextRight.id);
    image[0][j] = nextRight;
  }

  for (let i = 1; i < dimension; i++) {
    image[i] = [];
    for (let j = 0; j < dimension; j++) {
      const availableTiles = tiles.filter(t => !usedTiles.has(t.id));
      if (j === 0) {
        const [nextFirst, idx] = findMatchingLeftEdge(image[i - 1][0].edges.bottom, availableTiles) ?? [];
        if (!nextFirst) throw new Error(`Can't find next ${i} ${j}`);
        image[i][j] = transposeTile(nextFirst);
        usedTiles.add(nextFirst.id);
      } else {
        const [nextRight, idx] = findMatchingLeftEdge(image[i][j - 1].edges.right, availableTiles) ?? [];
        if (!nextRight) throw new Error(`Can't find next ${i} ${j}`);
        usedTiles.add(nextRight.id);
        image[i][j] = nextRight;
      }
    }
  }
  return image;
};

export const printTileCells = (tile: Tile) => {
  console.log(tile.cells.map(v => v.join('')).join('\n'));
};

export const stitchGrid = (tiles: Tile[][]): string[][] => {
  return tiles.map(row => {
    return row[0].cells.map((col, i) => row.reduce<string[]>((prev, current) => prev.concat(current.cells[i]), []));
  }).reduce((prev, current) => prev.concat(current), []);
};

export const stitchCells = (cells: string[][][][]): string[][] => {
  return cells.map(row => {
    return row[0].map((col, i) => row.reduce<string[]>((prev, current) => prev.concat(current[i]), []));
  }).reduce((prev, current) => prev.concat(current), []);
};

export const printFullGrid = (tiles: Tile[][]): void => {
  console.log(stitchGrid(tiles).map(line => line.join('')).join('\n'));
};

export const getEdgelessCells = ({ cells }: Tile): string[][] => {
  return cells.map(line => line.slice(1, -1)).slice(1, -1);
};

export const monsterShape = [
  '                  # '.split(''),
  '#    ##    ##    ###'.split(''),
  ' #  #  #  #  #  #   '.split(''),
];

export const checkSectionForMonster = (grid: string[][]): boolean => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (monsterShape[i][j] === '#' && grid[i][j] !== '#') {
        return false;
      }
    }
  }
  return true;
};

export const markMonster = (grid: string[][], i: number, j: number): string[][] => {
  monsterShape.forEach((row, mi) => row.forEach((cell, mj) => {
    if (monsterShape[mi][mj] === '#') {
      grid[i + mi][j + mj] = 'O';
    }
  }));
  return grid;
};

export const findMonsters = (grid: string[][]): { grid: string[][], monsterCount: number } => {
  let monsterCount = 0;
  for (let i = 0; i < grid.length - monsterShape.length; i++) {
    for (let j = 0; j < grid[0].length - monsterShape[0].length; j++) {
      const section = grid.map(line => line.slice(j, j + monsterShape[0].length)).slice(i, i + monsterShape.length);
      const hasMonster = checkSectionForMonster(section);
      if (hasMonster) {
        monsterCount++;
        grid = markMonster(grid, i, j);
      }
    }
  }
  return { grid, monsterCount };
};

export const flipGridHorizontally = <T>(grid: T[][]): T[][] => grid.map(row => row.slice().reverse());

export const transposeGrid = <T>(grid: T[][]): T[][] => {
  const output: T[][] = [];
  for (let i = 0; i < grid.length; i++) {
    output[i] = [];
    for (let j = 0; j < grid[0].length; j++) {
      output[i][j] = grid[j][i];
    }
  }
  return output;
};

export const rotateGridRight = <T>(grid: T[][]): T[][] => {
  return flipGridHorizontally(transposeGrid(grid));
};

export const orientations: ((grid: string[][]) => string[][])[] = [
  (grid) => grid,
  (grid) => rotateGridRight(grid),
  (grid) => rotateGridRight(rotateGridRight(grid)),
  (grid) => rotateGridRight(rotateGridRight(rotateGridRight(grid))),
  (grid) => flipGridHorizontally(grid),
  (grid) => rotateGridRight(flipGridHorizontally(grid)),
  (grid) => rotateGridRight(rotateGridRight(flipGridHorizontally(grid))),
  (grid) => rotateGridRight(rotateGridRight(rotateGridRight(flipGridHorizontally(grid)))),
];

export const findCorrectOrientationWithMonsters = (grid: string[][]) => {
  for (let i = 0; i < orientations.length; i++) {
    const { grid: newGrid, monsterCount } = findMonsters(orientations[i](grid));
    if (monsterCount !== 0) {
      return newGrid;
    }
  }
  return grid;
};

export const countRemainingMarks = (grid: string[][]) =>
  grid.reduce((sum, row) => row.filter(cell => cell === '#').length + sum, 0);

export class Puzzle202020 extends PuzzleDay {
  part1() {
    const tiles = parseInput(this.input);
    const corners = findCorners(tiles);
    const total = corners.reduce((product, c) => c.id * product, 1);
    return `${total}`;
  }

  part2() {
    const tiles = parseInput(this.input);
    const solved = solveImage(tiles);
    const cells = solved.map(r => r.map(getEdgelessCells));
    const stitched = stitchCells(cells);
    const found = findCorrectOrientationWithMonsters(stitched);
    const remaining = countRemainingMarks(found);
    return `${remaining}`;
  }
}
