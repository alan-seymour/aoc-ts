import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] =>
  splitLines(input).map((b) => parseInt(b, 10));

const countIncreasing = (ints: number[]): number =>
  ints.reduce<{ prev: number | null; count: number }>(
    ({ prev, count }, current) => {
      if (prev === null) return { prev: current, count };
      if (prev < current) return { prev: current, count: count + 1 };
      return { prev: current, count };
    },
    { prev: null, count: 0 }
  ).count;

const slidingWindowSumWidth3 = (ints: number[]) =>
  ints.slice(2).map((c, i) => c + ints[i + 1] + ints[i]);

export class Puzzle202101 extends PuzzleDay {
  part1() {
    const heights = parseInput(this.input);
    const increases = countIncreasing(heights);
    return `${increases}`;
  }

  part2() {
    const heights = parseInput(this.input);
    const slidingWindow = slidingWindowSumWidth3(heights);
    const count = countIncreasing(slidingWindow);
    return `${count}`;
  }
}
