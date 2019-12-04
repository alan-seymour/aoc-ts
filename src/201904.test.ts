import { parseInput, Puzzle201904 } from './201904';

describe('201904', () => {
  test('parseInput', () => {
    const input = `test
    test2`;
    const result = parseInput(input);
    expect(result).toEqual(['test', 'test2']);
  });
  test('Part 1 Example 1', () => {
    const day = new Puzzle201904('');
    day.loadData(`R8,U5,L5,D3
    U7,R6,D4,L4`);
    const result = day.part1();
    expect(result).toEqual('');
  });
  test('Part 2 Example 1', () => {
    const day = new Puzzle201904('');
    day.loadData(`R8,U5,L5,D3
    U7,R6,D4,L4`);
    const result = day.part2();
    expect(result).toEqual('');
  });
});
