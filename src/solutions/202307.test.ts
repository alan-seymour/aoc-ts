import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202307, parseInput } from './202307';

let day: Puzzle202307;

describe('202307', () => {
  beforeEach(() => {
    day = new Puzzle202307('');
  });

  test('parseInput', () => {
    const input = `32T3K 765
    T55J5 684`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        cards: [3, 2, 10, 3, 13],
        bid: 765,
      },
      {
        cards: [10, 5, 5, 11, 5],
        bid: 684,
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`);

    const result = day.part1();
    expect(result).toBe('6440');
  });

  test('part 2 example 1', () => {
    day.loadData(`32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`);

    const result = day.part2();
    expect(result).toBe('5905');
  });
});
