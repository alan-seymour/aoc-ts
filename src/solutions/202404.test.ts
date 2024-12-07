import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202404, parseInput } from './202404';

let day: Puzzle202404;

describe('202404', () => {
  beforeEach(() => {
    day = new Puzzle202404('');
  });

  test('parseInput', () => {
    const input = `MMM
XMA
MAS`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['M', 'M', 'M'],
      ['X', 'M', 'A'],
      ['M', 'A', 'S'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`);

    const result = day.part1();
    expect(result).toBe('18');
  });

  test('part 2 example 1', () => {
    day.loadData(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`);

    const result = day.part2();
    expect(result).toBe('9');
  });
});
