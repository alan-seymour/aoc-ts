import { Puzzle202015, parseInput } from './202015';

let day: Puzzle202015;

describe('202015', () => {
  beforeEach(() => {
    day = new Puzzle202015('');
  });

  test('parseInput', () => {
    const input = `1,3,2`;
    const result = parseInput(input);
    expect(result).toEqual([1, 3, 2]);
  });

  test('part 1 example 1', () => {
    day.loadData(`0,3,6`);
    const result = day.part1();
    expect(result).toBe('436');
  });

  test('part 1 example 2', () => {
    day.loadData(`1,3,2`);
    const result = day.part1();
    expect(result).toBe('1');
  });

  test('part 1 example 3', () => {
    day.loadData(`2,1,3`);
    const result = day.part1();
    expect(result).toBe('10');
  });

  test('part 1 example 4', () => {
    day.loadData(`1,2,3`);
    const result = day.part1();
    expect(result).toBe('27');
  });

  test('part 2 example 1', () => {
    day.loadData(`0,3,6`);
    const result = day.part2();
    expect(result).toBe('175594');
  });
});
