import { parseInput, Puzzle201906 } from './201906';

describe('201906', () => {
  test('parseInput', () => {
    const input = `test
    hello`;
    const result = parseInput(input);
    expect(result).toEqual(['test', 'hello']);
  });

  test('Part 1 Example 1', () => {
    const day = new Puzzle201906('');
    day.loadData(`R8,U5,L5,D3
    U7,R6,D4,L4`);
    const result = day.part1();
    expect(result).toEqual('');
  });

  test('Part 2 Example 1', () => {
    const day = new Puzzle201906('');
    day.loadData(`R8,U5,L5,D3
    U7,R6,D4,L4`);
    const result = day.part2();
    expect(result).toEqual('');
  });
});
