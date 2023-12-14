import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202314, parseInput } from './202314';

let day: Puzzle202314;

describe('202314', () => {
  beforeEach(() => {
    day = new Puzzle202314('');
  });

  test('parseInput', () => {
    const input = `O...
    O.OO
    ....`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['O', '.', '.', '.'],
      ['O', '.', 'O', 'O'],
      ['.', '.', '.', '.'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`O....#....
    O.OO#....#
    .....##...
    OO.#O....O
    .O.....O#.
    O.#..O.#.#
    ..O..#O..O
    .......O..
    #....###..
    #OO..#....`);

    const result = day.part1();
    expect(result).toBe('136');
  });

  test('part 2 example 1', () => {
    day.loadData(`O....#....
    O.OO#....#
    .....##...
    OO.#O....O
    .O.....O#.
    O.#..O.#.#
    ..O..#O..O
    .......O..
    #....###..
    #OO..#....`);

    const result = day.part2();
    expect(result).toBe('64');
  });
});
