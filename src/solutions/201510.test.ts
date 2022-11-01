import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201510, parseInput } from './201510';

let day: Puzzle201510;

describe('201510', () => {
  beforeEach(() => {
    day = new Puzzle201510('');
  });

  test('parseInput', () => {
    const input = ` 1123`;
    const result = parseInput(input);
    expect(result).toEqual('1123');
  });

  test('part 1 example 1', () => {
    day.loadData(`1`);
    const result = day.part1();
    expect(result).toBe('82350');
  });

  test('part 2 example 1', () => {
    day.loadData(`1`);
    const result = day.part2();
    expect(result).toBe('1166642');
  });
});
