import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202501, parseInput } from './202501';

let day: Puzzle202501;

describe('202501', () => {
  beforeEach(() => {
    day = new Puzzle202501('');
  });

  test('parseInput', () => {
    const input = `1
    123
    14`;

    const result = parseInput(input);
    expect(result).toEqual(['1', '123', '14']);
  });

  test('part 1 example 1', () => {
    day.loadData(` `);
    const result = day.part1();
    expect(result).toBe('');
  });

  test('part 2 example 1', () => {
    day.loadData(` `);
    const result = day.part2();
    expect(result).toBe('');
  });
});
