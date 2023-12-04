import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202303, parseInput } from './202303';

let day: Puzzle202303;

describe('202303', () => {
  beforeEach(() => {
    day = new Puzzle202303('');
  });

  test('parseInput', () => {
    const input = `467.
    ...*
    ..35`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['4', '6', '7', '.'],
      ['.', '.', '.', '*'],
      ['.', '.', '3', '5'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`);

    const result = day.part1();
    expect(result).toBe('4361');
  });

  test('part 2 example 1', () => {
    day.loadData(`467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..`);

    const result = day.part2();
    expect(result).toBe('467835');
  });
});
