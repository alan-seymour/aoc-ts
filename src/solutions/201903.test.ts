import { describe, test, expect, beforeEach } from 'vitest';
import { parseInput, Puzzle201903 } from './201903';

describe('201903', () => {
  test('parseInput', () => {
    const input = `R8,U5
    D7,L6`;

    const result = parseInput(input);

    expect(result).toEqual([
      [
        { direction: 'R', distance: 8 },
        { direction: 'U', distance: 5 },
      ],
      [
        { direction: 'D', distance: 7 },
        { direction: 'L', distance: 6 },
      ],
    ]);
  });

  test('Part 1 Example 1', () => {
    const day = new Puzzle201903('');

    day.loadData(`R8,U5,L5,D3
    U7,R6,D4,L4`);

    const result = day.part1();
    expect(result).toEqual('6');
  });

  test('Part 2 Example 1', () => {
    const day = new Puzzle201903('');

    day.loadData(`R8,U5,L5,D3
    U7,R6,D4,L4`);

    const result = day.part2();
    expect(result).toEqual('30');
  });
});
