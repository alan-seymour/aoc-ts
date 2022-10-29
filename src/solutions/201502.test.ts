import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201502, parseInput } from './201502';

let day: Puzzle201502;

describe('201502', () => {
  beforeEach(() => {
    day = new Puzzle201502('');
  });

  test('parseInput', () => {
    const input = `2x3x4
    1x1x10`;

    const result = parseInput(input);

    expect(result).toEqual([
      [2, 3, 4],
      [1, 1, 10],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`2x3x4
    1x1x10`);

    const result = day.part1();
    expect(result).toBe('101');
  });

  test('part 2 example 1', () => {
    day.loadData(`2x3x4
    1x1x10`);

    const result = day.part2();
    expect(result).toBe('48');
  });
});
