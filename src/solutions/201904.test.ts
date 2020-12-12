import {
  parseInput,
  hasDouble,
  hasMinDouble,
  numberIncrements,
} from './201904';

describe('201904', () => {
  test('parseInput', () => {
    const input = `1234-5742`;
    const result = parseInput(input);
    expect(result).toEqual([1234, 5742]);
  });

  test('numberIncrements true', () => {
    const result = numberIncrements(1223);
    expect(result).toEqual(true);
  });

  test('numberIncrements false', () => {
    const result = numberIncrements(12232);
    expect(result).toEqual(false);
  });

  test('hasDouble true', () => {
    const result = hasDouble(12232);
    expect(result).toEqual(true);
  });

  test('hasDouble false triple', () => {
    const result = hasDouble(122232);
    expect(result).toEqual(false);
  });

  test('hasDouble false', () => {
    const result = hasDouble(1234);
    expect(result).toEqual(false);
  });

  test('minDouble true', () => {
    const result = hasMinDouble(12232);
    expect(result).toEqual(true);
  });

  test('minDouble true triple', () => {
    const result = hasMinDouble(122232);
    expect(result).toEqual(true);
  });

  test('minDouble false', () => {
    const result = hasMinDouble(1234);
    expect(result).toEqual(false);
  });
});
