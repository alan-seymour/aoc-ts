import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202206, parseInput } from './202206';

let day: Puzzle202206;

describe('202206', () => {
  beforeEach(() => {
    day = new Puzzle202206('');
  });

  test('parseInput', () => {
    const input = `abc`;

    const result = parseInput(input);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('part 1 example 1', () => {
    day.loadData(`bvwbjplbgvbhsrlpgdmjqwftvncz`);
    const result = day.part1();
    expect(result).toBe('5');
  });

  test('part 1 example 2', () => {
    day.loadData(`nppdvjthqldpwncqszvftbrmjlhg`);
    const result = day.part1();
    expect(result).toBe('6');
  });

  test('part 1 example 3', () => {
    day.loadData(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`);
    const result = day.part1();
    expect(result).toBe('10');
  });

  test('part 1 example 4', () => {
    day.loadData(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`);
    const result = day.part1();
    expect(result).toBe('11');
  });

  test('part 2 example 1', () => {
    day.loadData(`mjqjpqmgbljsphdztnvjfqwrcgsmlb`);
    const result = day.part2();
    expect(result).toBe('19');
  });

  test('part 2 example 2', () => {
    day.loadData(`bvwbjplbgvbhsrlpgdmjqwftvncz`);
    const result = day.part2();
    expect(result).toBe('23');
  });

  test('part 2 example 3', () => {
    day.loadData(`nppdvjthqldpwncqszvftbrmjlhg`);
    const result = day.part2();
    expect(result).toBe('23');
  });

  test('part 2 example 4', () => {
    day.loadData(`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`);
    const result = day.part2();
    expect(result).toBe('29');
  });

  test('part 2 example 5', () => {
    day.loadData(`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`);
    const result = day.part2();
    expect(result).toBe('26');
  });
});
