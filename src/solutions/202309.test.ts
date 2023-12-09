import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202309, parseInput } from './202309';

let day: Puzzle202309;

describe('202309', () => {
  beforeEach(() => {
    day = new Puzzle202309('');
  });

  test('parseInput', () => {
    const input = `0 3 6 9 12 15
    1 3 6 10 15 21
    10 13 16 21 30 45`;

    const result = parseInput(input);

    expect(result).toEqual([
      [0, 3, 6, 9, 12, 15],
      [1, 3, 6, 10, 15, 21],
      [10, 13, 16, 21, 30, 45],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`0 3 6 9 12 15
    1 3 6 10 15 21
    10 13 16 21 30 45`);

    const result = day.part1();
    expect(result).toBe('114');
  });

  test('part 2 example 1', () => {
    day.loadData(`0 3 6 9 12 15
    1 3 6 10 15 21
    10 13 16 21 30 45`);

    const result = day.part2();
    expect(result).toBe('2');
  });
});
