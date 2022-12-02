import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202202, parseInput } from './202202';

let day: Puzzle202202;

describe('202202', () => {
  beforeEach(() => {
    day = new Puzzle202202('');
  });

  test('parseInput', () => {
    const input = `A Y
    B X
    C Z`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['A', 'Y'],
      ['B', 'X'],
      ['C', 'Z'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`A Y
    B X
    C Z`);

    const result = day.part1();
    expect(result).toBe('15');
  });

  test('part 2 example 1', () => {
    day.loadData(`A Y
    B X
    C Z`);

    const result = day.part2();
    expect(result).toBe('12');
  });
});
