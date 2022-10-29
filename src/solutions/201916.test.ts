import { describe, test, expect, beforeEach } from 'vitest';
import { parseInput } from './201916';

describe('201916', () => {
  test('parseInput', () => {
    const input = `1234556`;
    const result = parseInput(input);
    expect(result).toEqual([1, 2, 3, 4, 5, 5, 6]);
  });
});
