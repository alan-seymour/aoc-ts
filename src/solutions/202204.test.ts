import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202204, parseInput } from './202204';

let day: Puzzle202204;

describe('202204', () => {
  beforeEach(() => {
    day = new Puzzle202204('');
  });

  test('parseInput', () => {
    const input = `36-92,35-78
    26-31,25-27`;

    const result = parseInput(input);

    expect(result).toEqual([
      [36, 92, 35, 78],
      [26, 31, 25, 27],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`);

    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part 2 example 1', () => {
    day.loadData(`2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`);

    const result = day.part2();
    expect(result).toBe('4');
  });
});
