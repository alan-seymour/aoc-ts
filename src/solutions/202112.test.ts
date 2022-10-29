import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202112, parseInput } from './202112';

let day: Puzzle202112;

describe('202112', () => {
  beforeEach(() => {
    day = new Puzzle202112('');
  });

  test('parseInput', () => {
    const input = `start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`;

    const result = parseInput(input);

    expect([...result.entries()]).toEqual([
      ['start', ['A', 'b']],
      ['A', ['c', 'b', 'end']],
      ['b', ['A', 'd', 'end']],
      ['c', ['A']],
      ['d', ['b']],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`);

    const result = day.part1();
    expect(result).toBe('10');
  });

  test('part 2 example 1', () => {
    day.loadData(`start-A
    start-b
    A-c
    A-b
    b-d
    A-end
    b-end`);

    const result = day.part2();
    expect(result).toBe('36');
  });
});
