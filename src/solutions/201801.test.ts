import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201801, parseInput } from './201801';

let day: Puzzle201801;

describe('201801', () => {
  beforeEach(() => {
    day = new Puzzle201801('');
  });

  test('parseInput', () => {
    const input = `+7
    +7
    -2
    -7
    -4`;

    const result = parseInput(input);
    expect(result).toEqual([7, 7, -2, -7, -4]);
  });

  test('part 1 example 1', () => {
    day.loadData(`+1
    -2
    +3
    +1`);

    const result = day.part1();
    expect(result).toBe('3');
  });

  test('part 1 example 2', () => {
    day.loadData(`+1
    +1
    +1`);

    const result = day.part1();
    expect(result).toBe('3');
  });

  test('part 1 example 3', () => {
    day.loadData(`+1
    +1
    -2`);

    const result = day.part1();
    expect(result).toBe('0');
  });

  test('part 1 example 4', () => {
    day.loadData(`-1
    -2
    -3`);

    const result = day.part1();
    expect(result).toBe('-6');
  });

  test('part 2 example 1', () => {
    day.loadData(`+1
    -2
    +3
    +1`);

    const result = day.part2();
    expect(result).toBe('2');
  });

  test('part 2 example 2', () => {
    day.loadData(`+1
    -1`);

    const result = day.part2();
    expect(result).toBe('0');
  });

  test('part 2 example 3', () => {
    day.loadData(`+3
    +3
    +4
    -2
    -4`);

    const result = day.part2();
    expect(result).toBe('10');
  });

  test('part 2 example 4', () => {
    day.loadData(`-6
    +3
    +8
    +5
    -6`);

    const result = day.part2();
    expect(result).toBe('5');
  });

  test('part 2 example 5', () => {
    day.loadData(`+7
    +7
    -2
    -7
    -4`);

    const result = day.part2();
    expect(result).toBe('14');
  });
});
