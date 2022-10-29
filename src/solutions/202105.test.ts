import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202105, parseInput } from './202105';

let day: Puzzle202105;

describe('202105', () => {
  beforeEach(() => {
    day = new Puzzle202105('');
  });

  test('parseInput', () => {
    const input = `1,2 -> 3,4
    100,2 -> 80,123`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        start: { x: 1, y: 2 },
        end: { x: 3, y: 4 },
      },
      {
        start: { x: 100, y: 2 },
        end: { x: 80, y: 123 },
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2`);

    const result = day.part1();
    expect(result).toBe('5');
  });

  test('part 2 example 1', () => {
    day.loadData(`0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2`);

    const result = day.part2();
    expect(result).toBe('12');
  });
});
