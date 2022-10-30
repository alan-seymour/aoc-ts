import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201503, parseInput } from './201503';

let day: Puzzle201503;

describe('201503', () => {
  beforeEach(() => {
    day = new Puzzle201503('');
  });

  test('parseInput', () => {
    const input = `><^v`;
    const result = parseInput(input);
    expect(result).toEqual(['>', '<', '^', 'v']);
  });

  test('part 1 example 1', () => {
    day.loadData(`>`);
    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part 1 example 2', () => {
    day.loadData(`^>v<`);
    const result = day.part1();
    expect(result).toBe('4');
  });

  test('part 1 example 3', () => {
    day.loadData(`^v^v^v^v^v`);
    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part 2 example 1', () => {
    day.loadData(`^v`);
    const result = day.part2();
    expect(result).toBe('3');
  });

  test('part 2 example 2', () => {
    day.loadData(`^>v<`);
    const result = day.part2();
    expect(result).toBe('3');
  });

  test('part 2 example 3', () => {
    day.loadData(`^v^v^v^v^v`);
    const result = day.part2();
    expect(result).toBe('11');
  });
});
