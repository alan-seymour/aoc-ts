import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202001, parseInput } from './202001';

let day: Puzzle202001;

describe('202001', () => {
  beforeEach(() => {
    day = new Puzzle202001('');
  });

  test('parseInput', () => {
    const input = `7
    7
    2
    7
    4`;

    const result = parseInput(input);
    expect(result).toEqual([7, 7, 2, 7, 4]);
  });

  test('part1 example1', () => {
    day.loadData(`1721
    979
    366
    299
    675
    1456`);

    const result = day.part1();
    expect(result).toBe('514579');
  });

  test('part2 example1', () => {
    day.loadData(`1721
    979
    366
    299
    675
    1456`);

    const result = day.part2();
    expect(result).toBe('241861950');
  });
});
