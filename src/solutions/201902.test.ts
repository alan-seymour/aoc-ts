import { describe, test, expect, beforeEach } from 'vitest';
import { parseInput, runWithNounVerb } from './201902';

describe('201902', () => {
  test('parseInput', () => {
    const input = `3500,9,10,70,2,3,11,0,99,30,40,50`;
    const result = parseInput(input);
    expect(result).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  test('runToCompletion example 1', () => {
    const input = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    const result = runWithNounVerb(input, 9, 10);

    expect(result.state).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  test('runToCompletion example 2', () => {
    const input = [1, 0, 0, 2, 99];
    const result = runWithNounVerb(input, 0, 0);
    expect(result.state).toEqual([1, 0, 2, 2, 99]);
  });

  test('runToCompletion example 3', () => {
    const input = [2, 3, 0, 3, 99];
    const result = runWithNounVerb(input, 3, 0);
    expect(result.state).toEqual([2, 3, 0, 6, 99]);
  });

  test('runToCompletion example 4', () => {
    const input = [2, 4, 4, 5, 99, 0];
    const result = runWithNounVerb(input, 4, 4);
    expect(result.state).toEqual([2, 4, 4, 5, 99, 9801]);
  });

  test('runToCompletion example 4', () => {
    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const result = runWithNounVerb(input, 1, 1);
    expect(result.state).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });
});
