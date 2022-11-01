import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201509, parseInput } from './201509';

let day: Puzzle201509;

describe('201509', () => {
  beforeEach(() => {
    day = new Puzzle201509('');
  });

  test('parseInput', () => {
    const input = `Faerun to Tristram = 65
    Faerun to Tambi = 129
    Tristram to Tambi = 63`;

    const result = parseInput(input);

    expect(result).toEqual(
      new Map([
        [
          'Faerun',
          new Map([
            ['Tristram', 65],
            ['Tambi', 129],
          ]),
        ],
        [
          'Tristram',
          new Map([
            ['Faerun', 65],
            ['Tambi', 63],
          ]),
        ],
        [
          'Tambi',
          new Map([
            ['Faerun', 129],
            ['Tristram', 63],
          ]),
        ],
      ]),
    );
  });

  test('part 1 example 1', () => {
    day.loadData(`London to Dublin = 464
    London to Belfast = 518
    Dublin to Belfast = 141`);

    const result = day.part1();
    expect(result).toBe('605');
  });

  test('part 2 example 1', () => {
    day.loadData(`London to Dublin = 464
    London to Belfast = 518
    Dublin to Belfast = 141`);

    const result = day.part2();
    expect(result).toBe('982');
  });
});
