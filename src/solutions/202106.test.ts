import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202106, parseInput } from './202106';

let day: Puzzle202106;

describe('202106', () => {
  beforeEach(() => {
    day = new Puzzle202106('');
  });

  test('parseInput', () => {
    const input = `1,2,3,2`;
    const result = parseInput(input);

    expect(result).toEqual({
      '1': 1,
      '2': 2,
      '3': 1,
    });
  });

  test('part 1 example 1', () => {
    day.loadData(`3,4,3,1,2`);
    const result = day.part1();
    expect(result).toBe('5934');
  });

  test('part 2 example 1', () => {
    day.loadData(`3,4,3,1,2`);
    const result = day.part2();
    expect(result).toBe('26984457539');
  });
});
