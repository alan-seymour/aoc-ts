import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202506, parseInput } from './202506';

let day: Puzzle202506;

describe('202506', () => {
  beforeEach(() => {
    day = new Puzzle202506('');
  });

  test('parseInput', () => {
    const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

    const result = parseInput(input);
    expect(result).toEqual([
      '123 328  51 64 ',
      ' 45 64  387 23 ',
      '  6 98  215 314',
      '*   +   *   +  ',
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `);
    const result = day.part1();
    expect(result).toBe('4277556');
  });

  test('part 2 example 1', () => {
    day.loadData(`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `);
    const result = day.part2();
    expect(result).toBe('3263827');
  });
});
