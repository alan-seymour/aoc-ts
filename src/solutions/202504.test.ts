import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202504, parseInput } from './202504';

let day: Puzzle202504;

describe('202504', () => {
  beforeEach(() => {
    day = new Puzzle202504('');
  });

  test('parseInput', () => {
    const input = `.@.
@.@
...`;

    const result = parseInput(input);
    expect(result).toEqual([
      ['.', '@', '.'],
      ['@', '.', '@'],
      ['.', '.', '.'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`);
    const result = day.part1();
    expect(result).toBe('13');
  });

  test('part 2 example 1', () => {
    day.loadData(`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`);
    const result = day.part2();
    expect(result).toBe('43');
  });
});
