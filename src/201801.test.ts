import * as day from './201801';

describe('201801', () => {
  test('parseInput', () => {
    const input = `+7
    +7
    -2
    -7
    -4`;
    const result = day.parseInput(input);
    expect(result).toEqual([7, 7, -2, -7, -4]);
  });

  test('part 1 example 1', () => {
    const result = day.part1(`+1
    -2
    +3
    +1`);
    expect(result).toBe('3');
  });

  test('part 1 example 2', () => {
    const result = day.part1(`+1
    +1
    +1`);
    expect(result).toBe('3');
  });

  test('part 1 example 3', () => {
    const result = day.part1(`+1
    +1
    -2`);
    expect(result).toBe('0');
  });

  test('part 1 example 4', () => {
    const result = day.part1(`-1
    -2
    -3`);
    expect(result).toBe('-6');
  });

  test('part 2 example 1', () => {
    const result = day.part2(`+1
    -2
    +3
    +1`);
    expect(result).toBe('2');
  });

  test('part 2 example 2', () => {
    const result = day.part2(`+1
    -1`);
    expect(result).toBe('0');
  });

  test('part 2 example 3', () => {
    const result = day.part2(`+3
    +3
    +4
    -2
    -4`);
    expect(result).toBe('10');
  });

  test('part 2 example 4', () => {
    const result = day.part2(`-6
    +3
    +8
    +5
    -6`);
    expect(result).toBe('5');
  });

  test('part 2 example 5', () => {
    const result = day.part2(`+7
    +7
    -2
    -7
    -4`);
    expect(result).toBe('14');
  });
});