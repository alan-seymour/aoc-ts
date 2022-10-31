import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201508, parseInput } from './201508';

let day: Puzzle201508;

describe('201508', () => {
  beforeEach(() => {
    day = new Puzzle201508('');
  });

  test('parseInput', () => {
    const input = `""
    "abc"
    "aaa\\"aaa"
    "\\x27"`;

    const result = parseInput(input);
    expect(result).toEqual(['""', '"abc"', `"aaa\\"aaa"`, '"\\x27"']);
  });

  test('part 1 example 1', () => {
    day.loadData(`""
    "abc"
    "aaa\\"aaa"
    "\\x27"`);

    const result = day.part1();
    expect(result).toBe('12');
  });

  test('part 2 example 1', () => {
    day.loadData(`""
    "abc"
    "aaa\\"aaa"
    "\\x27"`);

    const result = day.part2();
    expect(result).toBe('19');
  });
});
