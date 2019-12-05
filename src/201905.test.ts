import { parseInput } from './201905';

describe('201905', () => {
  test('parseInput', () => {
    const input = `1234-5742`;
    const result = parseInput(input);
    expect(result).toEqual(['1234', '5742']);
  });
});
