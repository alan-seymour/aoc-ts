import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202316, parseInput } from './202316';

let day: Puzzle202316;

describe('202316', () => {
  beforeEach(() => {
    day = new Puzzle202316('');
  });

  test('parseInput', () => {
    const input = `.|...\\
    |.-.\\.`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['.', '|', '.', '.', '.', '\\'],
      ['|', '.', '-', '.', '\\', '.'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`.|...\\....
    |.-.\\.....
    .....|-...
    ........|.
    ..........
    .........\\
    ..../.\\\\..
    .-.-/..|..
    .|....-|.\\
    ..//.|....`);

    const result = day.part1();
    expect(result).toBe('46');
  });

  test('part 2 example 1', () => {
    day.loadData(`.|...\\....
    |.-.\\.....
    .....|-...
    ........|.
    ..........
    .........\\
    ..../.\\\\..
    .-.-/..|..
    .|....-|.\\
    ..//.|....`);

    const result = day.part2();
    expect(result).toBe('51');
  });
});
