import { Puzzle202107, parseInput } from './202107';

let day: Puzzle202107;

describe('202107', () => {
  beforeEach(() => {
    day = new Puzzle202107('');
  });

  test('parseInput', () => {
    const input = `1,2,3`;
    const result = parseInput(input);
    expect(result).toEqual([1, 2, 3]);
  });

  test('part 1 example 1', () => {
    day.loadData(`16,1,2,0,4,2,7,1,2,14`);
    const result = day.part1();
    expect(result).toBe('37');
  });

  test('part 2 example 1', () => {
    day.loadData(`16,1,2,0,4,2,7,1,2,14`);
    const result = day.part2();
    expect(result).toBe('168');
  });
});
