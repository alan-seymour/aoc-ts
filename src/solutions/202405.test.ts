import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202405, parseInput } from './202405';
import { invert } from 'lodash';

let day: Puzzle202405;

describe('202405', () => {
  beforeEach(() => {
    day = new Puzzle202405('');
  });

  test('parseInput', () => {
    const input = `1|2
3|2

10,11
1,4,6`;

    const result = parseInput(input);

    expect(result).toEqual({
      orderRules: new Map([
        [1, [2]],
        [3, [2]],
      ]),
      invertedOrderRules: new Map([[2, [1, 3]]]),
      updates: [
        [10, 11],
        [1, 4, 6],
      ],
    });
  });

  test('part 1 example 1', () => {
    day.loadData(`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`);

    const result = day.part1();
    expect(result).toBe('143');
  });

  test('part 2 example 1', () => {
    day.loadData(`47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`);

    const result = day.part2();
    expect(result).toBe('123');
  });
});
