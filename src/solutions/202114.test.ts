import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202114, parseInput } from './202114';

let day: Puzzle202114;

describe('202114', () => {
  beforeEach(() => {
    day = new Puzzle202114('');
  });

  test('parseInput', () => {
    const input = `NNCB

    CH -> B
    HH -> N`;

    const [start, rules] = parseInput(input);
    expect(start).toEqual(['N', 'N', 'C', 'B']);

    expect([...rules.entries()]).toEqual([
      ['CH', 'B'],
      ['HH', 'N'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`NNCB

    CH -> B
    HH -> N
    CB -> H
    NH -> C
    HB -> C
    HC -> B
    HN -> C
    NN -> C
    BH -> H
    NC -> B
    NB -> B
    BN -> B
    BB -> N
    BC -> B
    CC -> N
    CN -> C`);

    const result = day.part1();
    expect(result).toBe('1588');
  });

  test('part 2 example 1', () => {
    day.loadData(`NNCB

    CH -> B
    HH -> N
    CB -> H
    NH -> C
    HB -> C
    HC -> B
    HN -> C
    NN -> C
    BH -> H
    NC -> B
    NB -> B
    BN -> B
    BB -> N
    BC -> B
    CC -> N
    CN -> C`);

    const result = day.part2();
    expect(result).toBe('2188189693529');
  });
});
