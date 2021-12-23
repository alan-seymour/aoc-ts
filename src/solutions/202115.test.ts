import { Puzzle202115, parseInput } from './202115';

let day: Puzzle202115;

describe('202115', () => {
  beforeEach(() => {
    day = new Puzzle202115('');
  });

  test('parseInput', () => {
    const input = `123
    456
    789`;
    const result = parseInput(input);
    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`1163751742
    1381373672
    2136511328
    3694931569
    7463417111
    1319128137
    1359912421
    3125421639
    1293138521
    2311944581`);
    const result = day.part1();
    expect(result).toBe('40');
  });

  test('part 2 example 1', () => {
    day.loadData(`1163751742
    1381373672
    2136511328
    3694931569
    7463417111
    1319128137
    1359912421
    3125421639
    1293138521
    2311944581`);
    const result = day.part2();
    expect(result).toBe('315');
  });
});
