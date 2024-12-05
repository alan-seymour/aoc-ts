import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string => {
  const lines = splitLines(input).join('');
  return lines;
};

const findMuls = (input: string): string[] => {
  const muls = input.match(/mul\((\d+),(\d+)\)/g);
  return muls ?? [];
};

const doMul = (input: string): number => {
  const [a, b] = (input.match(/mul\((\d+),(\d+)\)/) ?? [0, 0]).slice(1).map(Number);
  return a * b;
};

const stripDonts = (input: string): string => input.replace(/don't\(\).*?(do\(\)|$)/g, '');

export class Puzzle202403 extends PuzzleDay {
  part1() {
    const line = parseInput(this.input);
    const muls = findMuls(line);
    const numbers = muls.map(mul => doMul(mul));
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    return `${sum}`;
  }

  part2() {
    const line = parseInput(this.input);
    const stripped = stripDonts(line);
    const muls = findMuls(stripped);
    const numbers = muls.map(mul => doMul(mul));
    const sum = numbers.reduce((acc, cur) => acc + cur, 0);
    return `${sum}`;
  }
}
