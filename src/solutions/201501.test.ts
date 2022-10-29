import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201501, parseInput } from './201501';

let day: Puzzle201501;

describe('201501', () => {
  beforeEach(() => {
    day = new Puzzle201501('');
  });

  test('parseInput', () => {
    const input = `(())`;
    const result = parseInput(input);
    expect(result).toEqual(['(', '(', ')', ')']);
  });

  test('part 1 example 1', () => {
    day.loadData(`(())`);
    const result = day.part1();
    expect(result).toBe('0');
  });

  test('part 1 example 2', () => {
    day.loadData(`(((`);
    const result = day.part1();
    expect(result).toBe('3');
  });

  test('part 1 example 3', () => {
    day.loadData(`))(((((`);
    const result = day.part1();
    expect(result).toBe('3');
  });

  test('part 1 example 4', () => {
    day.loadData(`())`);
    const result = day.part1();
    expect(result).toBe('-1');
  });

  test('part 1 example 5', () => {
    day.loadData(`)))`);
    const result = day.part1();
    expect(result).toBe('-3');
  });

  test('part 2 example 1', () => {
    day.loadData(`)`);
    const result = day.part2();
    expect(result).toBe('1');
  });

  test('part 2 example 2', () => {
    day.loadData(`()())`);
    const result = day.part2();
    expect(result).toBe('5');
  });
});
