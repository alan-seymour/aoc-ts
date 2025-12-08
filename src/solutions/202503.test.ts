import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202503, parseInput } from './202503';

let day: Puzzle202503;

describe('202503', () => {
  beforeEach(() => {
    day = new Puzzle202503('');
  });

  test('parseInput', () => {
    const input = `132
    123
    145`;

    const result = parseInput(input);
    expect(result).toEqual([
      [1, 3, 2],
      [1, 2, 3],
      [1, 4, 5],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`987654321111111
811111111111119
234234234234278
818181911112111`);
    const result = day.part1();
    expect(result).toBe('357');
  });

  test('part 2 example 1', () => {
    day.loadData(`987654321111111
811111111111119
234234234234278
818181911112111`);
    const result = day.part2();
    expect(result).toBe('3121910778619');
  });
});
