import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201506, parseInput } from './201506';

let day: Puzzle201506;

describe('201506', () => {
  beforeEach(() => {
    day = new Puzzle201506('');
  });

  test('parseInput', () => {
    const input = `turn on 212,957 through 490,987
    toggle 171,31 through 688,88
    turn off 991,989 through 994,998`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        action: 'turn on',
        range: {
          start: {
            x: 212,
            y: 957,
          },
          end: {
            x: 490,
            y: 987,
          },
        },
      },
      {
        action: 'toggle',
        range: {
          start: {
            x: 171,
            y: 31,
          },
          end: {
            x: 688,
            y: 88,
          },
        },
      },
      {
        action: 'turn off',
        range: {
          start: {
            x: 991,
            y: 989,
          },
          end: {
            x: 994,
            y: 998,
          },
        },
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`turn on 0,0 through 999,999
    toggle 0,0 through 999,0
    turn off 499,499 through 500,500`);

    const result = day.part1();
    expect(result).toBe('998996');
  });

  test('part 2 example 1', () => {
    day.loadData(`turn on 0,0 through 0,0
    toggle 0,0 through 999,999`);

    const result = day.part2();
    expect(result).toBe('2000001');
  });

  test('part 2 example 2', () => {
    day.loadData(`turn on 0,0 through 999,999
    toggle 0,0 through 999,0
    turn off 499,499 through 500,500`);

    const result = day.part2();
    expect(result).toBe('1001996');
  });
});
