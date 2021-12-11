import { Puzzle202111, parseInput } from './202111';

let day: Puzzle202111;

describe('202111', () => {
  beforeEach(() => {
    day = new Puzzle202111('');
  });

  test('parseInput', () => {
    const input = `12
    23`;
    const result = parseInput(input);
    expect(result).toEqual([
      [
        { energy: 1, flashed: false },
        { energy: 2, flashed: false },
      ],
      [
        { energy: 2, flashed: false },
        { energy: 3, flashed: false },
      ],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`5483143223
    2745854711
    5264556173
    6141336146
    6357385478
    4167524645
    2176841721
    6882881134
    4846848554
    5283751526`);
    const result = day.part1();
    expect(result).toBe('1656');
  });

  test('part 2 example 1', () => {
    day.loadData(`5483143223
    2745854711
    5264556173
    6141336146
    6357385478
    4167524645
    2176841721
    6882881134
    4846848554
    5283751526`);
    const result = day.part2();
    expect(result).toBe('195');
  });
});
