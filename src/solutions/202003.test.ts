import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202003, parseInput } from './202003';

let day: Puzzle202003;

describe('202003', () => {
  beforeEach(() => {
    day = new Puzzle202003('');
  });

  test('parseInput', () => {
    const input = `.#.
    ###
    ..#`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['.', '#', '.'],
      ['#', '#', '#'],
      ['.', '.', '#'],
    ]);
  });

  test('part1 example1', () => {
    day.loadData(`..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#`);

    const result = day.part1();
    expect(result).toBe('7');
  });

  test('part2 example1', () => {
    day.loadData(`..##.......
    #...#...#..
    .#....#..#.
    ..#.#...#.#
    .#...##..#.
    ..#.##.....
    .#.#.#....#
    .#........#
    #.##...#...
    #...##....#
    .#..#...#.#`);

    const result = day.part2();
    expect(result).toBe('336');
  });
});
