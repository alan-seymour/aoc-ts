import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202014, parseInput } from './202014';

let day: Puzzle202014;

describe('202014', () => {
  beforeEach(() => {
    day = new Puzzle202014('');
  });

  test('parseInput', () => {
    const input = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        command: 'MASK',
        bitmask: [
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          'X',
          '1',
          'X',
          'X',
          'X',
          'X',
          '0',
          'X',
        ],
      },
      {
        command: 'MEM',
        location: 8,
        binaryLocation: [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '1',
          '0',
          '0',
          '0',
        ],
        value: 11,
        binaryValue: [
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '0',
          '1',
          '0',
          '1',
          '1',
        ],
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
    mem[8] = 11
    mem[7] = 101
    mem[8] = 0`);

    const result = day.part1();
    expect(result).toBe('165');
  });

  test('part 2 example 1', () => {
    day.loadData(`mask = 000000000000000000000000000000X1001X
    mem[42] = 100
    mask = 00000000000000000000000000000000X0XX
    mem[26] = 1`);

    const result = day.part2();
    expect(result).toBe('208');
  });
});
