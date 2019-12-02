import { Puzzle201902, parseInput } from './201902';

let day: Puzzle201902;

describe('201901', () => {
  beforeEach(() => {
    day = new Puzzle201902('');
  });

  test('parseInput', () => {
    const input = `7
    7
    2
    7
    4`;
    const result = parseInput(input);
    expect(result).toEqual([7, 7, 2, 7, 4]);
  });

  test('part1 example1', () => {
    day.loadData(`12`);
    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part2 example1', () => {
    day.loadData(`1969`);
    const result = day.part2();
    expect(result).toBe('966');
  });

});
