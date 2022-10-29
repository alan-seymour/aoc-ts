import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202018, parseInput } from './202018';

let day: Puzzle202018;

describe('202018', () => {
  beforeEach(() => {
    day = new Puzzle202018('');
  });

  test('parseInput', () => {
    const input = `1 + 2 * 3 + 4 * 5 + 6
    2 * 3 + (4 * 5)`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['1', '+', '2', '*', '3', '+', '4', '*', '5', '+', '6'],
      ['2', '*', '3', '+', '(', '4', '*', '5', ')'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`2 * 3 + (4 * 5)
    5 + (8 * 3 + 9 + 3 * 4 * 3)
    5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`);

    const result = day.part1();
    expect(result).toBe('12703');
  });

  test('part 2 example 1', () => {
    day.loadData(`2 * 3 + (4 * 5)
    5 + (8 * 3 + 9 + 3 * 4 * 3)
    5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`);

    const result = day.part2();
    expect(result).toBe('670551');
  });
});
