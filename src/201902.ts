import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

export const parseInput = (input: string) => {
  const lines = splitLines(input);
  const numbers = lines.map(line => parseInt(line, 10));
  return numbers;
};

export class Puzzle201902 extends PuzzleDay {
  part1() {
    return '';
  }

  part2() {
    return '';
  }
}
