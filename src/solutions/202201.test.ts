import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202201, parseInput } from './202201';

let day: Puzzle202201;

describe('202201', () => {
  beforeEach(() => {
    day = new Puzzle202201('');
  });

  test('parseInput', () => {
    const input = `1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    7000
    8000
    9000
    
    10000`;

    const result = parseInput(input);
    expect(result).toEqual([6000, 4000, 11000, 24000, 10000]);
  });

  test('part 1 example 1', () => {
    day.loadData(`1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    7000
    8000
    9000
    
    10000`);

    const result = day.part1();
    expect(result).toBe('24000');
  });

  test('part 2 example 1', () => {
    day.loadData(`1000
    2000
    3000
    
    4000
    
    5000
    6000
    
    7000
    8000
    9000
    
    10000`);

    const result = day.part2();
    expect(result).toBe('45000');
  });
});
