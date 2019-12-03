import { Puzzle201802, parseInput } from './201802';

let day: Puzzle201802;

describe('201802', () => {
  beforeEach(() => {
    day = new Puzzle201802('');
  });

  test('parseInput', () => {
    const input = `abc
    def
    asds`;
    const result = parseInput(input);
    expect(result).toEqual(['abc', 'def', 'asds']);
  });

  test('part 1 example 1', () => {
    day.loadData(`abcdef`);
    const result = day.part1();
    expect(result).toBe('0');
  });

  test('part 1 example 2', () => {
    day.loadData(`bababc`);
    const result = day.part1();
    expect(result).toBe('1');
  });

  test('part 1 example 3', () => {
    day.loadData(`abcdef
    bababc
    abbcde
    abcccd
    aabcdd
    abcdee
    ababab`);
    const result = day.part1();
    expect(result).toBe('12');
  });

  test('part 2 example 1', () => {
    day.loadData(`abcde
    fghij
    klmno
    pqrst
    fguij
    axcye
    wvxyz`);
    const result = day.part2();
    expect(result).toBe('fgij');
  });
});
