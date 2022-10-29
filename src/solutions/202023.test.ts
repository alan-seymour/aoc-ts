import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202023, parseInput } from './202023';

let day: Puzzle202023;

describe('202023', () => {
  beforeEach(() => {
    day = new Puzzle202023('');
  });

  test('parseInput', () => {
    const input = `234123`;
    const result = parseInput(input);
    expect(result).toEqual([2, 3, 4, 1, 2, 3]);
  });

  test('part 1 example 1', () => {
    day.loadData(`389125467`);
    const result = day.part1();
    expect(result).toBe('67384529');
  });

  test('part 2 example 1', () => {
    day.loadData(`389125467`);
    const result = day.part2();
    expect(result).toBe('149245887792');
  });
});
