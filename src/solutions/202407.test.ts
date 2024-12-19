import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202407, parseInput } from './202407';

let day: Puzzle202407;

describe('202407', () => {
  beforeEach(() => {
    day = new Puzzle202407('');
  });

  test('parseInput', () => {
    const input = `190: 10 19
3267: 81 40 27`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        testValue: 190,
        values: [10, 19],
      },
      {
        testValue: 3267,
        values: [81, 40, 27],
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`);

    const result = day.part1();
    expect(result).toBe('3749');
  });

  test('part 2 example 1', () => {
    day.loadData(`190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`);

    const result = day.part2();
    expect(result).toBe('11387');
  });
});
