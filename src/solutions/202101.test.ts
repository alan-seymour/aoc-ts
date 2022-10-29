import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202101, parseInput } from './202101';

let day: Puzzle202101;

describe('202101', () => {
  beforeEach(() => {
    day = new Puzzle202101('');
  });

  test('parseInput', () => {
    const input = `123
    345`;

    const result = parseInput(input);
    expect(result).toEqual([123, 345]);
  });

  test('part 1 example 1', () => {
    day.loadData(`199
    200
    208
    210
    200
    207
    240
    269
    260
    263`);

    const result = day.part1();
    expect(result).toBe('7');
  });

  test('part 2 example 1', () => {
    day.loadData(`199
    200
    208
    210
    200
    207
    240
    269
    260
    263`);

    const result = day.part2();
    expect(result).toBe('5');
  });
});
