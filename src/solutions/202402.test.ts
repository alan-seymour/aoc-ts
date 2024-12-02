import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202402, parseInput } from './202402';

let day: Puzzle202402;

describe('202402', () => {
  beforeEach(() => {
    day = new Puzzle202402('');
  });

  test('parseInput', () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

    const result = parseInput(input);

    expect(result).toEqual([
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`);

    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part 2 example 1', () => {
    day.loadData(`7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`);

    const result = day.part2();
    expect(result).toBe('4');
  });
});
