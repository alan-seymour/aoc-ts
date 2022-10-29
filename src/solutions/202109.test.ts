import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202109, parseInput } from './202109';

let day: Puzzle202109;

describe('202109', () => {
  beforeEach(() => {
    day = new Puzzle202109('');
  });

  test('parseInput', () => {
    const input = `123
    123
    144`;

    const result = parseInput(input);

    expect(result).toEqual([
      [1, 2, 3],
      [1, 2, 3],
      [1, 4, 4],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`2199943210
    3987894921
    9856789892
    8767896789
    9899965678`);

    const result = day.part1();
    expect(result).toBe('15');
  });

  test('part 2 example 1', () => {
    day.loadData(`2199943210
    3987894921
    9856789892
    8767896789
    9899965678`);

    const result = day.part2();
    expect(result).toBe('1134');
  });
});
