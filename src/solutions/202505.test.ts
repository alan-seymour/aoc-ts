import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202505, parseInput } from './202505';

let day: Puzzle202505;

describe('202505', () => {
  beforeEach(() => {
    day = new Puzzle202505('');
  });

  test('parseInput', () => {
    const input = `3-5
10-14

1
5`;

    const result = parseInput(input);
    expect(result).toEqual({
      freshRanges: [
        { min: 3n, max: 5n },
        { min: 10n, max: 14n },
      ],
      food: [1n, 5n],
    });
  });

  test('part 1 example 1', () => {
    day.loadData(`3-5
10-14
16-20
12-18

1
5
8
11
17
32`);
    const result = day.part1();
    expect(result).toBe('3');
  });

  test('part 2 example 1', () => {
    day.loadData(`3-5
10-14
16-20
12-18

1
5
8
11
17
32`);
    const result = day.part2();
    expect(result).toBe('14');
  });

  test('part 2 example 2', () => {
    day.loadData(`3-5
6-10

1`);
    const result = day.part2();
    expect(result).toBe('8');
  });

  test('part 2 example 3', () => {
    day.loadData(`3-8
4-7

1`);
    const result = day.part2();
    expect(result).toBe('6');
  });

  test('part 2 example 4', () => {
    day.loadData(`3-5
5-10

1`);
    const result = day.part2();
    expect(result).toBe('8');
  });
});
