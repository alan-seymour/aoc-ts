import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202308, parseInput } from './202308';

let day: Puzzle202308;

describe('202308', () => {
  beforeEach(() => {
    day = new Puzzle202308('');
  });

  test('parseInput', () => {
    const input = `LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`;

    const result = parseInput(input);

    expect(result).toEqual({
      moves: ['L', 'L', 'R'],
      map: {
        AAA: {
          L: 'BBB',
          R: 'BBB',
        },
        BBB: {
          L: 'AAA',
          R: 'ZZZ',
        },
        ZZZ: {
          L: 'ZZZ',
          R: 'ZZZ',
        },
      },
    });
  });

  test('part 1 example 1', () => {
    day.loadData(`RL

    AAA = (BBB, CCC)
    BBB = (DDD, EEE)
    CCC = (ZZZ, GGG)
    DDD = (DDD, DDD)
    EEE = (EEE, EEE)
    GGG = (GGG, GGG)
    ZZZ = (ZZZ, ZZZ)`);

    const result = day.part1();
    expect(result).toBe('2');
  });

  test('part 1 example 2', () => {
    day.loadData(`LLR

    AAA = (BBB, BBB)
    BBB = (AAA, ZZZ)
    ZZZ = (ZZZ, ZZZ)`);

    const result = day.part1();
    expect(result).toBe('6');
  });

  test('part 2 example 1', () => {
    day.loadData(`LR

    11A = (11B, XXX)
    11B = (XXX, 11Z)
    11Z = (11B, XXX)
    22A = (22B, XXX)
    22B = (22C, 22C)
    22C = (22Z, 22Z)
    22Z = (22B, 22B)
    XXX = (XXX, XXX)`);

    const result = day.part2();
    expect(result).toBe('6');
  });
});
