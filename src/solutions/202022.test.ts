import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202022, parseInput } from './202022';

let day: Puzzle202022;

describe('202022', () => {
  beforeEach(() => {
    day = new Puzzle202022('');
  });

  test('parseInput', () => {
    const input = `Player 1:
    9
    2
    6
    3
    1

    Player 2:
    5
    8
    4
    7
    10`;

    const result = parseInput(input);

    expect(result).toEqual([
      [9, 2, 6, 3, 1],
      [5, 8, 4, 7, 10],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`Player 1:
    9
    2
    6
    3
    1

    Player 2:
    5
    8
    4
    7
    10`);

    const result = day.part1();
    expect(result).toBe('306');
  });

  test('part 2 example 1', () => {
    day.loadData(`Player 1:
    9
    2
    6
    3
    1

    Player 2:
    5
    8
    4
    7
    10`);

    const result = day.part2();
    expect(result).toBe('291');
  });
});
