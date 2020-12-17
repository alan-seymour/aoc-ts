import { Puzzle202017, parseInput } from './202017';

let day: Puzzle202017;

describe('202017', () => {
  beforeEach(() => {
    day = new Puzzle202017('');
  });

  test('parseInput', () => {
    const input = `.#.
    ..#
    ###`;
    const result = parseInput(input);
    expect(result).toEqual([
      ['.', '#', '.'],
      ['.', '.', '#'],
      ['#', '#', '#']
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`.#.
    ..#
    ###`);
    const result = day.part1();
    expect(result).toBe('112');
  });

  test('part 2 example 1', () => {
    day.loadData(`.#.
    ..#
    ###`);
    const result = day.part2();
    expect(result).toBe('848');
  });
});
