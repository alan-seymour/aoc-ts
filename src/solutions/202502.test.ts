import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202502, parseInput } from './202502';

let day: Puzzle202502;

describe('202502', () => {
  beforeEach(() => {
    day = new Puzzle202502('');
  });

  test('parseInput', () => {
    const input = `11-22,95-115,998-1012,1188511880-1188511890`;

    const result = parseInput(input);
    expect(result).toEqual([
      [11, 22],
      [95, 115],
      [998, 1012],
      [1188511880, 1188511890],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(
      `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
    );
    const result = day.part1();
    expect(result).toBe('1227775554');
  });

  test('part 2 example 1', () => {
    day.loadData(
      `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`,
    );
    const result = day.part2();
    expect(result).toBe('4174379265');
  });
});
