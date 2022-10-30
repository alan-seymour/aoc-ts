import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201505, parseInput } from './201505';

let day: Puzzle201505;

describe('201505', () => {
  beforeEach(() => {
    day = new Puzzle201505('');
  });

  test('parseInput', () => {
    const input = `abc
    def`;

    const result = parseInput(input);
    expect(result).toEqual(['abc', 'def']);
  });

  test('part 1 example 1', () => {
    day.loadData(`ugknbfddgicrmopn
    aaa
    jchzalrnumimnmhp
    haegwjzuvuyypxyu
    dvszwmarrgswjxmb`);

    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part 2 example 1', () => {
    day.loadData(`qjhvhtzxzqqjkmpb
    xxyxx
    uurcxstgmygtbstg
    ieodomkazucvgmuy`);

    const result = day.part2();
    expect(result).toBe('2');
  });
});
