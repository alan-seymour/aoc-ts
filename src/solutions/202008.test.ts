import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202008, parseInput } from './202008';

let day: Puzzle202008;

describe('202008', () => {
  beforeEach(() => {
    day = new Puzzle202008('');
  });

  test('parseInput', () => {
    const input = `nop +0
    acc +1
    jmp -4`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        instruction: 'nop',
        value: 0,
      },
      {
        instruction: 'acc',
        value: 1,
      },
      {
        instruction: 'jmp',
        value: -4,
      },
    ]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`nop +0
    acc +1
    jmp +4
    acc +3
    jmp -3
    acc -99
    acc +1
    jmp -4
    acc +6`);

    const result = day.part1();
    expect(result).toBe('5');
  });

  test('Part 2 example 1', () => {
    day.loadData(`nop +0
    acc +1
    jmp +4
    acc +3
    jmp -3
    acc -99
    acc +1
    jmp -4
    acc +6`);

    const result = day.part2();
    expect(result).toBe('8');
  });
});
