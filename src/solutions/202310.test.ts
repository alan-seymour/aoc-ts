import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202310, parseInput } from './202310';

let day: Puzzle202310;

describe('202310', () => {
  beforeEach(() => {
    day = new Puzzle202310('');
  });

  test('parseInput', () => {
    const input = `.....
    .F-7.
    .|.|.
    .L-J.
    .....`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['.', '.', '.', '.', '.'],
      ['.', 'F', '-', '7', '.'],
      ['.', '|', '.', '|', '.'],
      ['.', 'L', '-', 'J', '.'],
      ['.', '.', '.', '.', '.'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`.....
    .S-7.
    .|.|.
    .L-J.
    .....`);

    const result = day.part1();
    expect(result).toBe('4');
  });

  test('part 1 example 2', () => {
    day.loadData(`..F7.
    .FJ|.
    SJ.L7
    |F--J
    LJ...`);

    const result = day.part1();
    expect(result).toBe('8');
  });

  test('part 2 example 1', () => {
    day.loadData(`...........
    .S-------7.
    .|F-----7|.
    .||.....||.
    .||.....||.
    .|L-7.F-J|.
    .|..|.|..|.
    .L--J.L--J.
    ...........`);

    const result = day.part2();
    expect(result).toBe('4');
  });

  test('part 2 example 2', () => {
    day.loadData(`.F----7F7F7F7F-7....
    .|F--7||||||||FJ....
    .||.FJ||||||||L7....
    FJL7L7LJLJ||LJ.L-7..
    L--J.L7...LJS7F-7L7.
    ....F-J..F7FJ|L7L7L7
    ....L7.F7||L7|.L7L7|
    .....|FJLJ|FJ|F7|.LJ
    ....FJL-7.||.||||...
    ....L---J.LJ.LJLJ...`);

    const result = day.part2();
    expect(result).toBe('8');
  });

  test('part 2 example 3', () => {
    day.loadData(`FF7FSF7F7F7F7F7F---7
    L|LJ||||||||||||F--J
    FL-7LJLJ||||||LJL-77
    F--JF--7||LJLJ7F7FJ-
    L---JF-JLJ.||-FJLJJ7
    |F|F-JF---7F7-L7L|7|
    |FFJF7L7F-JF7|JL---7
    7-L-JL7||F7|L7F-7F7|
    L.L7LFJ|||||FJL7||LJ
    L7JLJL-JLJLJL--JLJ.L`);

    const result = day.part2();
    expect(result).toBe('10');
  });
});
