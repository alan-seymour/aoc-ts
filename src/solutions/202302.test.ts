import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202302, parseInput } from './202302';

let day: Puzzle202302;

describe('202302', () => {
  beforeEach(() => {
    day = new Puzzle202302('');
  });

  test('parseInput', () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        id: 1,
        draws: [
          {
            red: 4,
            green: 0,
            blue: 3,
          },
          {
            red: 1,
            green: 2,
            blue: 6,
          },
          {
            red: 0,
            green: 2,
            blue: 0,
          },
        ],
      },
      {
        id: 2,
        draws: [
          {
            red: 0,
            green: 2,
            blue: 1,
          },
          {
            red: 1,
            green: 3,
            blue: 4,
          },
          {
            red: 0,
            green: 1,
            blue: 1,
          },
        ],
      },
      {
        id: 3,
        draws: [
          {
            red: 20,
            green: 8,
            blue: 6,
          },
          {
            red: 4,
            green: 13,
            blue: 5,
          },
          {
            red: 1,
            green: 5,
            blue: 0,
          },
        ],
      },
      {
        id: 4,
        draws: [
          {
            red: 3,
            green: 1,
            blue: 6,
          },
          {
            red: 6,
            green: 3,
            blue: 0,
          },
          {
            red: 14,
            green: 3,
            blue: 15,
          },
        ],
      },
      {
        id: 5,
        draws: [
          {
            red: 6,
            green: 3,
            blue: 1,
          },
          {
            red: 1,
            green: 2,
            blue: 2,
          },
        ],
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);

    const result = day.part1();
    expect(result).toBe('8');
  });

  test('part 2 example 1', () => {
    day.loadData(`Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
    Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
    Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
    Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
    Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`);

    const result = day.part2();
    expect(result).toBe('2286');
  });
});
