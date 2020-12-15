import { map } from 'lodash';
import { number } from 'yargs';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  const values = input.split(',').map(v => parseInt(v, 10));
  return values;
};


export const nextNumber = (step: number, cache: Map<number, number>, previousValue: number): number => {
  const next = step - (cache.get(previousValue) ?? step);
  cache.set(previousValue, step);
  return next;
};

export const findNth = (starting: number[], total: number): number => {
  let next: number = starting.pop() ?? 0;
  const cache = new Map<number, number>();
  starting.forEach((v, i) => cache.set(v, i));
  for (let i = starting.length; i < total - 1; i++) {
    next = nextNumber(i, cache, next);
  }
  return next;
};

export class Puzzle202015 extends PuzzleDay {
  part1() {
    const starting = parseInput(this.input);
    const result = findNth(starting, 2020);
    return `${result}`;
  }

  part2() {
    const starting = parseInput(this.input);
    const result = findNth(starting, 30000000);
    return `${result}`;
  }
}
