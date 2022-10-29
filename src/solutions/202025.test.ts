import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202025, parseInput } from './202025';

let day: Puzzle202025;

describe('202025', () => {
  beforeEach(() => {
    day = new Puzzle202025('');
  });

  test('parseInput', () => {
    const input = `123
    345`;

    const result = parseInput(input);
    expect(result).toEqual([123, 345]);
  });

  test('part 1 example 1', () => {
    day.loadData(`5764801
    17807724`);

    const result = day.part1();
    expect(result).toBe('14897079');
  });
});
