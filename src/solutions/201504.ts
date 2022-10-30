import * as crypto from 'node:crypto';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string => {
  const key = input.trim();
  return key;
};

const hashUntilPrefix = (key: string, prefix: string) => {
  let i = 1;
  let hashed = crypto.createHash('md5').update(`${key}${i}`).digest('hex');

  while (hashed.slice(0, prefix.length) !== prefix) {
    i++;
    hashed = crypto.createHash('md5').update(`${key}${i}`).digest('hex');
  }

  return i;
};

export class Puzzle201504 extends PuzzleDay {
  part1() {
    const key = parseInput(this.input);
    const result = hashUntilPrefix(key, '00000');
    return `${result}`;
  }

  part2() {
    const key = parseInput(this.input);
    const result = hashUntilPrefix(key, '000000');
    return `${result}`;
  }
}
