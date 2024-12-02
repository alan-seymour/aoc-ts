import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202401, parseInput } from './202401';

let day: Puzzle202401;

describe('202401', () => {
  beforeEach(() => {
    day = new Puzzle202401('');
  });

  test('parseInput', () => {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

    const result = parseInput(input);
    expect(result).toEqual([[3,4,2,1,3,3], [4,3,5,3,9,3]]);
  });

  test('part 1 example 1', () => {
    day.loadData(`3   4
4   3
2   5
1   3
3   9
3   3`);
    const result = day.part1();
    expect(result).toBe('11');
  });

  test('part 2 example 1', () => {
    day.loadData(`3   4
4   3
2   5
1   3
3   9
3   3`);
    const result = day.part2();
    expect(result).toBe('31');
  });
});
