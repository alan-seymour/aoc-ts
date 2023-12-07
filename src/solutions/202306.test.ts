import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202306, parseInput } from './202306';

let day: Puzzle202306;

describe('202306', () => {
  beforeEach(() => {
    day = new Puzzle202306('');
  });

  test('parseInput', () => {
    const input = `Time:      7  15   30
    Distance:  9  40  200`;

    const result = parseInput(input);

    expect(result).toEqual([
      { time: 7, distance: 9 },
      { time: 15, distance: 40 },
      { time: 30, distance: 200 },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`Time:      7  15   30
    Distance:  9  40  200`);

    const result = day.part1();
    expect(result).toBe('288');
  });

  test('part 2 example 1', () => {
    day.loadData(`Time:      7  15   30
    Distance:  9  40  200`);

    const result = day.part2();
    expect(result).toBe('71503');
  });
});
