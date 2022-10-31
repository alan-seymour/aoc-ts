import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201507, parseInput } from './201507';

let day: Puzzle201507;

describe('201507', () => {
  beforeEach(() => {
    day = new Puzzle201507('');
  });

  test('parseInput', () => {
    const input = `123 -> x
    x AND 3 -> d
    x LSHIFT 2 -> f
    NOT y -> i`;

    const result = parseInput(input);

    expect([...result.entries()]).toEqual([
      ['x', { input: { action: 'SET', input: 123 } }],
      ['d', { input: { action: 'AND', input: ['x', 3] } }],
      ['f', { input: { action: 'LSHIFT', input: 'x', places: 2 } }],
      ['i', { input: { action: 'NOT', input: 'y' } }],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`123 -> x
    456 -> b
    x AND b -> d
    x OR b -> e
    x LSHIFT 2 -> f
    b RSHIFT 2 -> g
    NOT b -> a
    NOT b -> i`);

    const result = day.part1();
    expect(result).toBe('65079');
  });

  test('part 2 example 1', () => {
    day.loadData(`123 -> x
    456 -> b
    x AND b -> d
    x OR b -> e
    x LSHIFT 2 -> f
    b RSHIFT 2 -> g
    NOT b -> a
    NOT b -> i`);

    const result = day.part2();
    expect(result).toBe('456');
  });
});
