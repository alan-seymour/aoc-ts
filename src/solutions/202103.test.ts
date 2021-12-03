import { Puzzle202103, parseInput } from './202103';

let day: Puzzle202103;

describe('202103', () => {
  beforeEach(() => {
    day = new Puzzle202103('');
  });

  test('parseInput', () => {
    const input = `00
    11`;
    const result = parseInput(input);
    expect(result).toEqual([
      [0, 0],
      [1, 1],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010`);
    const result = day.part1();
    expect(result).toBe('198');
  });

  test('part 2 example 1', () => {
    day.loadData(`00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010`);
    const result = day.part2();
    expect(result).toBe('230');
  });
});
