import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Seat = '.' | '#' | 'L';

type SeatGrid = Seat[][];

export const parseInput = (input: string): SeatGrid => {
  const lines = splitLines(input).map(line => line.split('').map(s => {
    if (s === '#' || s === '.' || s === 'L') return s;
    throw new Error('Invalid input');
  }));
  return lines;
};

export const surroundingSeats = (maxI: number, maxJ: number, i: number, j: number): number[][] => {
  return [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ].filter(([ti, tj]) => (ti >= 0 && tj >= 0 && ti < maxI && tj < maxJ));
};

type SurroundingAlgo = (grid: SeatGrid, i: number, j: number) => number;

type Direction = 'TL' | 'T' | 'TR' | 'L' | 'R' | 'BL' | 'B' | 'BR';

const moveDirection: { [key in Direction]: (i: number, j: number) => [number, number] } = {
  'TL': (i, j) => [i - 1, j - 1],
  'T': (i, j) => [i - 1, j],
  'TR': (i, j) => [i - 1, j + 1],
  'L': (i, j) => [i, j - 1],
  'R': (i, j) => [i, j + 1],
  'BL': (i, j) => [i + 1, j - 1],
  'B': (i, j) => [i + 1, j],
  'BR': (i, j) => [i + 1, j + 1],
};

export const directions: Direction[] = ['TL', 'T', 'TR', 'L', 'R', 'BL', 'B', 'BR'];

export const nextIsTaken = (direction: Direction, grid: SeatGrid, i: number, j: number): boolean => {
  let ti = i;
  let tj = j;
  [ti, tj] = moveDirection[direction](ti, tj);
  while (ti < grid.length && tj < grid[0].length && ti >= 0 && tj >= 0) {
    if (grid[ti][tj] === '#') return true;
    if (grid[ti][tj] === 'L') return false;
    [ti, tj] = moveDirection[direction](ti, tj);
  }
  return false;
};

export const countVisibleSurrounding: SurroundingAlgo = (grid, i, j) => {
  const sightLines = directions.map(s => nextIsTaken(s, grid, i, j));
  return sightLines.filter(Boolean).length;
};

export const countImmediateSurroundingOccupied: SurroundingAlgo = (grid, i, j) => {
  const surrounding = surroundingSeats(grid.length, grid[0].length, i, j);
  return surrounding.filter(([ti, tj]) => grid[ti][tj] === '#').length;
};

export const incrementState = (grid: SeatGrid, surr: SurroundingAlgo, allowedNearby: number): SeatGrid => {
  return grid.map((line, i) => line.map((seat, j) => {
    if (seat === '.') return '.';
    const surroundingCount = surr(grid, i, j);
    if ((seat === '#' && surroundingCount < allowedNearby) || (seat === 'L' && surroundingCount === 0)) return '#';
    return 'L';
  }));
};

export const gridToString = (grid: SeatGrid): string => grid.map(v => v.join('')).join('');

const waitForStable = (grid: SeatGrid, surr: SurroundingAlgo, allowedNearby: number): SeatGrid => {
  let prevGrid = gridToString(grid);
  let nextGridState = incrementState(grid, surr, allowedNearby);
  let nextGrid = gridToString(nextGridState);
  while (prevGrid !== nextGrid) {
    prevGrid = nextGrid;
    nextGridState = incrementState(nextGridState, surr, allowedNearby);
    nextGrid = gridToString(nextGridState);
  }
  return nextGridState;
};

const countOccupied = (grid: SeatGrid): number => grid.reduce((sum, line) => line.filter(s => s === '#').length + sum, 0);

export class Puzzle202011 extends PuzzleDay {
  part1() {
    const grid = parseInput(this.input);
    const finalGrid = waitForStable(grid, countImmediateSurroundingOccupied, 4);
    const occupied = countOccupied(finalGrid);
    return `${occupied}`;
  }

  part2() {
    const grid = parseInput(this.input);
    const finalGrid = waitForStable(grid, countVisibleSurrounding, 5);
    const occupied = countOccupied(finalGrid);
    return `${occupied}`;
  }
}
