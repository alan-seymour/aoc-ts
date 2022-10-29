import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202009, parseInput, findFirstNonSum, findContiguousRangeWithSum } from './202009';

let day: Puzzle202009;

describe('202009', () => {
  beforeEach(() => {
    day = new Puzzle202009('');
  });

  test('parseInput', () => {
    const input = `1
    123
    14`;

    const result = parseInput(input);
    expect(result).toEqual([1, 123, 14]);
  });

  test('findFirstNonSum', () => {
    const input = parseInput(`35
    20
    15
    25
    47
    40
    62
    55
    65
    95
    102
    117
    150
    182
    127
    219
    299
    277
    309
    576`);

    const result = findFirstNonSum(input, 5);
    expect(result).toBe(127);
  });

  test('findContiguousRangeWithSum', () => {
    const input = parseInput(`35
    20
    15
    25
    47
    40
    62
    55
    65
    95
    102
    117
    150
    182
    127
    219
    299
    277
    309
    576`);

    const result = findContiguousRangeWithSum(input, 127);
    expect(result).toMatchObject([15, 25, 47, 40]);
  });
});
