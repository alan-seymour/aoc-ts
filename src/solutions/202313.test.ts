import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202313, parseInput } from './202313';

let day: Puzzle202313;

describe('202313', () => {
  beforeEach(() => {
    day = new Puzzle202313('');
  });

  test('parseInput', () => {
    const input = `#.##.
    ..#..
    
    #...#
    #....`;

    const result = parseInput(input);

    expect(result).toEqual([
      [
        ['#', '.', '#', '#', '.'],
        ['.', '.', '#', '.', '.'],
      ],
      [
        ['#', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.'],
      ],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`#.##..##.
    ..#.##.#.
    ##......#
    ##......#
    ..#.##.#.
    ..##..##.
    #.#.##.#.
    
    #...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`);

    const result = day.part1();
    expect(result).toBe('405');
  });

  test('part 2 example 1', () => {
    day.loadData(`#.##..##.
    ..#.##.#.
    ##......#
    ##......#
    ..#.##.#.
    ..##..##.
    #.#.##.#.
    
    #...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`);

    const result = day.part2();
    expect(result).toBe('400');
  });
});
