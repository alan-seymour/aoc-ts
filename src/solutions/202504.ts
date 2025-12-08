import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][] => {
  const lines = splitLines(input).map(line => line.split(''));
  return lines;
};

const nearby = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const checkSquare = (map: string[][], x: number, y: number): boolean =>
  nearby.reduce((sum, [moveX, moveY]) => {
    if ((map[y + moveY]?.[x + moveX] ?? '') === '@') {
      return sum + 1;
    }
    return sum;
  }, 0) < 4;

const countEasy = (map: string[][]): number => {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '@' && checkSquare(map, j, i)) {
        // console.log(i, j);
        sum++;
      }
    }
  }

  return sum;
};

const removeEasy = (map: string[][]): number => {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '@' && checkSquare(map, j, i)) {
        sum++;
        map[i][j] = '.';
      }
    }
  }

  return sum;
};

const removeAllEasy = (map: string[][]): number => {
  let sum = 0;
  let removed = 0;

  do {
    removed = removeEasy(map);
    sum += removed;
  } while (removed > 0);

  return sum;
};

export class Puzzle202504 extends PuzzleDay {
  part1() {
    const map = parseInput(this.input);
    const count = countEasy(map);
    return `${count}`;
  }

  part2() {
    const map = parseInput(this.input);
    const count = removeAllEasy(map);
    return `${count}`;
  }
}
