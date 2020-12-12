import { Puzzle202006, parseInput } from './202006';

let day: Puzzle202006;

describe('202005', () => {
  beforeEach(() => {
    day = new Puzzle202006('');
  });

  test('parseInput', () => {
    const input = `abc

    a
    b
    c

    ab
    ac

    a
    a
    a
    a

    b`;
    const result = parseInput(input);
    expect(result).toEqual([['abc'], ['a', 'b', 'c'], ['ab', 'ac'], ['a', 'a', 'a', 'a'], ['b']]);
  });

  test('Part 1 example 1', () => {
    day.loadData(`abc

    a
    b
    c

    ab
    ac

    a
    a
    a
    a

    b`);
    const result = day.part1();
    expect(result).toBe('11');
  });

  test('Part 2 example 1', () => {
    day.loadData(`abc

    a
    b
    c

    ab
    ac

    a
    a
    a
    a

    b`);
    const result = day.part2();
    expect(result).toBe('6');
  });

});
