import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201906 } from './201906';

describe('201906', () => {
  test('Part 1 Example 1', () => {
    const day = new Puzzle201906('');

    day.loadData(`COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L`);

    const result = day.part1();
    expect(result).toEqual('42');
  });

  test('Part 2 Example 1', () => {
    const day = new Puzzle201906('');

    day.loadData(`COM)B
    B)C
    C)D
    D)E
    E)F
    B)G
    G)H
    D)I
    E)J
    J)K
    K)L
    K)YOU
    I)SAN`);

    const result = day.part2();
    expect(result).toEqual('4');
  });
});
