import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202403, parseInput } from './202403';

let day: Puzzle202403;

describe('202403', () => {
  beforeEach(() => {
    day = new Puzzle202403('');
  });

  test('parseInput', () => {
    const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

    const result = parseInput(input);

    expect(result).toEqual(
      'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))',
    );
  });

  test('part 1 example 1', () => {
    day.loadData(`xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`);
    const result = day.part1();
    expect(result).toBe('161');
  });

  test('part 2 example 1', () => {
    day.loadData(`xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`);
    const result = day.part2();
    expect(result).toBe('48');
  });
});
