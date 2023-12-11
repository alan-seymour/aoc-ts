import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202311, parseInput } from './202311';

let day: Puzzle202311;

describe('202311', () => {
  beforeEach(() => {
    day = new Puzzle202311('');
  });

  test('parseInput', () => {
    const input = `...#
    ....
    #...`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['.', '.', '.', '#'],
      ['.', '.', '.', '.'],
      ['#', '.', '.', '.'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....`);

    const result = day.part1();
    expect(result).toBe('374');
  });

  test('part 2 example 1', () => {
    day.loadData(`...#......
    .......#..
    #.........
    ..........
    ......#...
    .#........
    .........#
    ..........
    .......#..
    #...#.....`);

    const result = day.part2();
    expect(result).toBe('82000210');
  });
});
