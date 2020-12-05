import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

type Grid = string[][];

export const parseInput = (input: string): Grid => {
  const lines = splitLines(input);
  const grid = lines.map((line) => line.split(''));
  return grid;
};

const countTrees = (grid: Grid, slopeDown: number, slopeRight: number): number => {
  let rightOffset = 0;
  const width = grid[0].length;
  let treeCount = 0;
  for (let i = 0; i < grid.length; i += slopeDown) {
    if (grid[i][rightOffset % width] === '#') {
      treeCount++;
    }
    rightOffset += slopeRight;
  }
  return treeCount;
};


export class Puzzle202003 extends PuzzleDay {
  part1() {
    const grid = parseInput(this.input);
    const trees = countTrees(grid, 1, 3);
    return `${trees}`;
  }

  part2() {
    const grid = parseInput(this.input);
    const input = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]];
    const product = input.reduce((product, [down, right]) => product * countTrees(grid, down, right), 1);
    return `${product}`;
  }
}
