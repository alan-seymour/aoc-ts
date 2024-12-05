import { Y } from 'vitest/dist/chunks/reporters.D7Jzd9GS';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Coord = {
  x: number;
  y: number;
};

export const parseInput = (input: string): string[][] => {
  const grid = splitLines(input).map(line => line.split(''));
  return grid;
};

const checkSquareForWord = (grid: string[][], start: Coord): number => {
  const word = 'XMAS';
  let idx = 0;
  let possibles = ['up', 'down', 'left', 'right', 'upLeft', 'upRight', 'downLeft', 'downRight'];

  while (idx < word.length && possibles.length > 0) {
    const char = word[idx];

    possibles = possibles.filter(direction => {
      let charAtCoord = '';

      switch (direction) {
        case 'up': {
          charAtCoord = grid[start.y - idx]?.[start.x] ?? '';
          break;
        }

        case 'down': {
          charAtCoord = grid[start.y + idx]?.[start.x] ?? '';
          break;
        }

        case 'left': {
          charAtCoord = grid[start.y]?.[start.x - idx] ?? '';
          break;
        }

        case 'right': {
          charAtCoord = grid[start.y]?.[start.x + idx] ?? '';
          break;
        }

        case 'upLeft': {
          charAtCoord = grid[start.y - idx]?.[start.x - idx] ?? '';
          break;
        }

        case 'upRight': {
          charAtCoord = grid[start.y - idx]?.[start.x + idx] ?? '';
          break;
        }

        case 'downLeft': {
          charAtCoord = grid[start.y + idx]?.[start.x - idx] ?? '';
          break;
        }

        case 'downRight': {
          charAtCoord = grid[start.y + idx]?.[start.x + idx] ?? '';
          break;
        }
      }

      return charAtCoord === char;
    });

    idx++;
  }

  // console.log(start, possibles);

  return possibles.length;
};

const countWord = (grid: string[][]): number => {
  const result = grid.reduce(
    (sum, line, y) =>
      line.reduce((lineSum, _, x) => checkSquareForWord(grid, { x, y }) + lineSum, 0) + sum,
    0,
  );

  return result;
};

const checkSquareForCross = (grid: string[][], start: Coord): boolean => {
  if (grid[start.y]?.[start.x] !== 'A') {
    return false;
  }

  const topLeft = grid[start.y - 1]?.[start.x - 1] ?? '';
  const topRight = grid[start.y - 1]?.[start.x + 1] ?? '';
  const bottomLeft = grid[start.y + 1]?.[start.x - 1] ?? '';
  const bottomRight = grid[start.y + 1]?.[start.x + 1] ?? '';

  return (
    ((topLeft === 'M' && bottomRight === 'S') || (topLeft === 'S' && bottomRight === 'M')) &&
    ((topRight === 'M' && bottomLeft === 'S') || (topRight === 'S' && bottomLeft === 'M'))
  );
};

const countXs = (grid: string[][]): number =>
  grid.reduce(
    (sum, line, y) => line.filter((char, x) => checkSquareForCross(grid, { x, y })).length + sum,
    0,
  );

export class Puzzle202404 extends PuzzleDay {
  part1() {
    const grid = parseInput(this.input);
    const counts = countWord(grid);
    return `${counts}`;
  }

  part2() {
    const grid = parseInput(this.input);
    const counts = countXs(grid);
    return `${counts}`;
  }
}
