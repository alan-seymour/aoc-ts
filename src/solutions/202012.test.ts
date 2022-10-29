import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202012, parseInput } from './202012';

let day: Puzzle202012;

describe('202012', () => {
  beforeEach(() => {
    day = new Puzzle202012('');
  });

  test('parseInput', () => {
    const input = `F10
    N3
    F7
    R90
    F11`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        instruction: 'F',
        value: 10,
      },
      {
        instruction: 'N',
        value: 3,
      },
      {
        instruction: 'F',
        value: 7,
      },
      {
        instruction: 'R',
        value: 90,
      },
      {
        instruction: 'F',
        value: 11,
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`F10
    N3
    F7
    R90
    F11`);

    const result = day.part1();
    expect(result).toBe('25');
  });

  test('part 2 example 1', () => {
    day.loadData(`F10
    N3
    F7
    R90
    F11`);

    const result = day.part2();
    expect(result).toBe('286');
  });
});
