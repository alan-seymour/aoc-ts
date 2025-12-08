import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202501, parseInput } from './202501';

let day: Puzzle202501;

describe('202501', () => {
  beforeEach(() => {
    day = new Puzzle202501('');
  });

  test('parseInput', () => {
    const input = `L68
L30
R48`;

    const result = parseInput(input);
    expect(result).toEqual([
      {
        direction: 'L',
        distance: 68,
      },
      {
        direction: 'L',
        distance: 30,
      },
      {
        direction: 'R',
        distance: 48,
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`);
    const result = day.part1();
    expect(result).toBe('3');
  });

  test('part 2 example 1', () => {
    day.loadData(`L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`);
    const result = day.part2();
    expect(result).toBe('6');
  });

  test('part 2 example 2', () => {
    day.loadData(`L68
R1000`);
    const result = day.part2();
    expect(result).toBe('11');
  });
});
