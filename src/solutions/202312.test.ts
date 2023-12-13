import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202312, parseInput } from './202312';

let day: Puzzle202312;

describe('202312', () => {
  beforeEach(() => {
    day = new Puzzle202312('');
  });

  test('parseInput', () => {
    const input = `???.### 1,1,3
    .??..??...?##. 1,1,3`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        layout: ['?', '?', '?', '.', '#', '#', '#'],
        numeric: [1, 1, 3],
      },
      {
        layout: ['.', '?', '?', '.', '.', '?', '?', '.', '.', '.', '?', '#', '#', '.'],
        numeric: [1, 1, 3],
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`???.### 1,1,3
    .??..??...?##. 1,1,3
    ?#?#?#?#?#?#?#? 1,3,1,6
    ????.#...#... 4,1,1
    ????.######..#####. 1,6,5
    ?###???????? 3,2,1`);

    const result = day.part1();
    expect(result).toBe('21');
  });

  test('part 2 example 1', () => {
    day.loadData(`???.### 1,1,3
    .??..??...?##. 1,1,3
    ?#?#?#?#?#?#?#? 1,3,1,6
    ????.#...#... 4,1,1
    ????.######..#####. 1,6,5
    ?###???????? 3,2,1`);

    const result = day.part2();
    expect(result).toBe('525152');
  });
});
