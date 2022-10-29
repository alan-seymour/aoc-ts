import { describe, test, expect, beforeEach } from 'vitest';
import { parseInput } from './201914';

describe('201902', () => {
  test('parseInput', () => {
    const input = `10 ORE => 10 A
    1 ORE => 1 B
    7 A, 1 B => 1 C
    7 A, 1 C => 1 D
    7 A, 1 D => 1 E
    7 A, 1 E => 1 FUEL`;

    const result = parseInput(input);
    expect(result.size).toEqual(6);
  });
});
