import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201511, parseInput } from './201511';

let day: Puzzle201511;

describe('201511', () => {
  beforeEach(() => {
    day = new Puzzle201511('');
  });

  test('parseInput', () => {
    const input = `abcde`;
    const result = parseInput(input);
    expect(result).toEqual(['a', 'b', 'c', 'd', 'e']);
  });

  test('part 1 example 1', () => {
    day.loadData(`abcdefgh`);
    const result = day.part1();
    expect(result).toBe('abcdffaa');
  });

  test('part 2 example 1', () => {
    day.loadData(`abcdefgh`);
    const result = day.part2();
    expect(result).toBe('abcdffbb');
  });
});
