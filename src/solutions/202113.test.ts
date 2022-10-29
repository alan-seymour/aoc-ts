import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202113, parseInput } from './202113';

let day: Puzzle202113;

describe('202113', () => {
  beforeEach(() => {
    day = new Puzzle202113('');
  });

  test('parseInput', () => {
    const input = `6,10
    0,14
    9,10
    
    fold along y=7
    fold along x=5`;

    const result = parseInput(input);

    expect(result).toEqual([
      [
        { x: 6, y: 10 },
        { x: 0, y: 14 },
        { x: 9, y: 10 },
      ],
      [
        { dir: 'y', pos: 7 },
        { dir: 'x', pos: 5 },
      ],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`6,10
    0,14
    9,10
    0,3
    10,4
    4,11
    6,0
    6,12
    4,1
    0,13
    10,12
    3,4
    3,0
    8,4
    1,10
    2,14
    8,10
    9,0
    
    fold along y=7
    fold along x=5`);

    const result = day.part1();
    expect(result).toBe('17');
  });

  test('part 2 example 1', () => {
    day.loadData(`6,10
    0,14
    9,10
    0,3
    10,4
    4,11
    6,0
    6,12
    4,1
    0,13
    10,12
    3,4
    3,0
    8,4
    1,10
    2,14
    8,10
    9,0
    
    fold along y=7
    fold along x=5`);

    const result = day.part2();

    expect(result).toBe(
      `#####
#...#
#...#
#...#
#####`,
    );
  });
});
