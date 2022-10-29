import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[][] => {
  const lines = splitLines(input).map(l => l.split('').map(d => parseInt(d, 10)));

  return lines;
};

const sumColumns = (bins: number[][]): number[] =>
  bins.reduce<number[]>((s, c) => {
    c.forEach((d, i) => {
      s[i] += d;
    });

    return s;
  }, new Array(bins[0].length).fill(0));

const mostCommonBits = (bins: number[][]): number[] => {
  const total = bins.length / 2;
  const sums = sumColumns(bins);
  return sums.map(c => (c >= total ? 1 : 0));
};

const mostCommonBit = (bins: number[][], index: number): number => {
  const total = bins.length / 2;
  const sum = bins.reduce<number>((r, c) => r + c[index], 0);
  return sum >= total ? 1 : 0;
};

const findRating = (
  bins: number[][],
  filter: (input: number[][], index: number) => number[][],
): number[] => {
  let index = 0;
  let possible = bins.slice();

  while (possible.length > 1 && index < bins[0].length) {
    possible = filter(possible, index);
    index++;
  }

  return possible[0];
};

const co2Filter = (input: number[][], index: number): number[][] => {
  const mostCommon = mostCommonBit(input, index);
  return input.filter(p => p[index] !== mostCommon);
};

const o2Filter = (input: number[][], index: number): number[][] => {
  const mostCommon = mostCommonBit(input, index);
  return input.filter(p => p[index] === mostCommon);
};

export class Puzzle202103 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const gamma = parseInt(mostCommonBits(lines).join(''), 2);
    const mask = parseInt(new Array(lines[0].length).fill(1).join(''), 2);
    const epsilon = gamma ^ mask;
    return `${epsilon * gamma}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const oxygen = parseInt(findRating(lines, o2Filter).join(''), 2);
    const co2 = parseInt(findRating(lines, co2Filter).join(''), 2);
    return `${oxygen * co2}`;
  }
}
