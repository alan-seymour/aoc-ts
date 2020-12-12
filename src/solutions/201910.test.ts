import { parseInput } from './201910';

describe('201910', () => {
  test('parseInput', () => {
    const input = `.#..#
    .....`;
    const result = parseInput(input);
    expect(result).toEqual([
      ['.', '#', '.', '.', '#'],
      ['.', '.', '.', '.', '.'],
    ]);
  });
});
