import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201504, parseInput } from './201504';

let day: Puzzle201504;

describe('201504', () => {
  beforeEach(() => {
    day = new Puzzle201504('');
  });

  test('parseInput', () => {
    const input = `abcdef`;
    const result = parseInput(input);
    expect(result).toEqual('abcdef');
  });

  test('part 1 example 1', () => {
    day.loadData(`abcdef`);
    const result = day.part1();
    expect(result).toBe('609043');
  });

  test('part 1 example 2', () => {
    day.loadData(`pqrstuv`);
    const result = day.part1();
    expect(result).toBe('1048970');
  });

  test('part 2 example 1', () => {
    day.loadData(`iwrupvqb`);
    const result = day.part2();
    expect(result).toBe('9958218');
  });
});
