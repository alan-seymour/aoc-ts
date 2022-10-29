import { describe, test, expect, beforeEach } from 'vitest';
import { parseInput } from './201909';

describe('201909', () => {
  test('parseInput', () => {
    const input = `3500,9,10,70,2,3,11,0,99,30,40,50`;
    const result = parseInput(input);
    expect(result).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });
});
