import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle201803 } from './201803';

describe('201803', () => {
  describe('part 1', () => {
    test('example 1', () => {
      const day = new Puzzle201803('');

      day.loadData(`#1 @ 1,3: 4x4
      #2 @ 3,1: 4x4
      #3 @ 5,5: 2x2`);

      const result = day.part1();
      expect(result).toBe('4');
    });
  });

  describe('part 2', () => {
    test('example 1', () => {
      const day = new Puzzle201803('');

      day.loadData(`#1 @ 1,3: 4x4
      #2 @ 3,1: 4x4
      #3 @ 5,5: 2x2`);

      const result = day.part2();
      expect(result).toBe('3');
    });
  });
});
