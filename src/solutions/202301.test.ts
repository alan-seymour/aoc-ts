import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202301, parseInput } from './202301';

let day: Puzzle202301;

describe('202301', () => {
  beforeEach(() => {
    day = new Puzzle202301('');
  });

  test('parseInput', () => {
    const input = `1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`;

    const result = parseInput(input);
    expect(result).toEqual(['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet']);
  });

  test('part 1 example 1', () => {
    day.loadData(`1abc2
    pqr3stu8vwx
    a1b2c3d4e5f
    treb7uchet`);

    const result = day.part1();
    expect(result).toBe('142');
  });

  test('part 2 example 1', () => {
    day.loadData(`two1nine
    eightwothree
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`);

    const result = day.part2();
    expect(result).toBe('281');
  });

  test('part 2 merged numbers', () => {
    day.loadData(`two1nine
    eightwothree
    threeight
    abcone2threexyz
    xtwone3four
    4nineeightseven2
    zoneight234
    7pqrstsixteen`);

    const result = day.part2();
    expect(result).toBe('319');
  });
});
