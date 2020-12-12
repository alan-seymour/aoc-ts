import { Puzzle202002, parseInput } from './202002';

let day: Puzzle202002;

describe('202002', () => {
  beforeEach(() => {
    day = new Puzzle202002('');
  });

  test('parseInput', () => {
    const input = `1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`;
    const result = parseInput(input);
    expect(result).toEqual([
      { val1: 1, val2: 3, char: 'a', pass: 'abcde' },
      { val1: 1, val2: 3, char: 'b', pass: 'cdefg' },
      { val1: 2, val2: 9, char: 'c', pass: 'ccccccccc' },
    ]);
  });

  test('part1 example1', () => {
    day.loadData(`1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc`);
    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part2 example1', () => {
    day.loadData(`1-3 a: abcde
    1-3 b: cdefg
    2-9 c: ccccccccc
    2-5 t: bmltz`);
    const result = day.part2();
    expect(result).toBe('1');
  });
});
