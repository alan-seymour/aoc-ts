import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  const lines = splitLines(input).map(v => parseInt(v, 10));
  return lines;
};

type Counts = {
  [key: number]: number;
};

export const countIntervals = (input: number[]) => {
  input.sort((a, b) => a - b);
  return input.reduce<{ counts: Counts, prev: number }>(({ counts, prev }, curr) => (
    {
      counts: {
        ...counts,
        [curr - prev]: (counts[curr - prev] ?? 0) + 1,
      },
      prev: curr
    }
  ), { counts: {}, prev: 0 }).counts;
};

let cache = new Map<number, number>();

const possibleNext = (current: number) => [current + 1, current + 2, current + 3];

export const countPaths = (input: number[], start: number): number => {
  if (cache.has(start)) {
    return cache.get(start) ?? 0;
  }

  const pathCount = Math.max(possibleNext(start)
    .filter(v => input.indexOf(v) !== -1)
    .map(v => countPaths(input, v))
    .reduce((sum, curr) => sum + curr, 0), 1);

  cache.set(start, pathCount);
  return pathCount;
};

export class Puzzle202010 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const intervals = countIntervals(lines);
    intervals[3]++;
    const result = intervals[1] * intervals[3];
    return `${result}`;
  }

  part2() {
    cache = new Map();
    const lines = parseInput(this.input);
    const paths = countPaths(lines, 0);
    return `${paths}`;
  }
}
