import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[][] => {
  const sequences = splitLines(input).map(l => l.split(' ').map(n => Number(n)));
  return sequences;
};

const sequenceToDiffs = (input: number[]): number[] => input.slice(1).map((n, i) => n - input[i]);

const isZeros = (input: number[]): boolean => input.every(n => n === 0);

const findNext = (input: number[]): number => {
  const diffs = sequenceToDiffs(input);

  if (isZeros(diffs)) {
    return input[0];
  }

  return (input.at(-1) ?? 0) + findNext(diffs);
};

const findPrevious = (input: number[]): number => {
  const diffs = sequenceToDiffs(input);

  if (isZeros(diffs)) {
    return input[0];
  }

  return input[0] - findPrevious(diffs);
};

export class Puzzle202309 extends PuzzleDay {
  part1() {
    const sequences = parseInput(this.input);
    const nexts = sequences.map(s => findNext(s));
    const sum = nexts.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }

  part2() {
    const sequences = parseInput(this.input);
    const prevs = sequences.map(s => findPrevious(s));
    const sum = prevs.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }
}
