import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202304, parseInput } from './202304';

let day: Puzzle202304;

describe('202304', () => {
  beforeEach(() => {
    day = new Puzzle202304('');
  });

  test('parseInput', () => {
    const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 20: 13 32 20 16 61 | 61 30 68 82 17 32 24 19`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        number: 1,
        winning: [41, 48, 83, 86, 17],
        numbers: [83, 86, 6, 31, 17, 9, 48, 53],
      },
      {
        number: 20,
        winning: [13, 32, 20, 16, 61],
        numbers: [61, 30, 68, 82, 17, 32, 24, 19],
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`);

    const result = day.part1();
    expect(result).toBe('13');
  });

  test('part 2 example 1', () => {
    day.loadData(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`);

    const result = day.part2();
    expect(result).toBe('30');
  });
});
