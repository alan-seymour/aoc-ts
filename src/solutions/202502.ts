import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): bigint[][] => {
  const lines = splitLines(input);
  return lines[0].split(',').map(rawRange => rawRange.split('-').map(num => BigInt(num)));
};

const sumRegexInvalidInrange = (start: bigint, end: bigint, pattern: RegExp): bigint => {
  let sum = BigInt(0);
  for (let i = start; i <= end; i++) {
    if (pattern.test(i.toString())) {
      sum += i;
    }
  }

  return sum;
};

export class Puzzle202502 extends PuzzleDay {
  part1() {
    const ranges = parseInput(this.input);
    const pattern = /^(.+)\1$/;
    const sum = ranges.reduce(
      (sum, [low, high]) => sum + sumRegexInvalidInrange(low, high, pattern),
      BigInt(0),
    );
    return `${sum}`;
  }

  part2() {
    const ranges = parseInput(this.input);
    const pattern = /^(.+)\1+$/;
    const sum = ranges.reduce(
      (sum, [low, high]) => sum + sumRegexInvalidInrange(low, high, pattern),
      BigInt(0),
    );
    return `${sum}`;
  }
}
