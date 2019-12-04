import {
  parseInput,
  numberToSequences,
  hasDouble,
  hasMinDouble,
  sequencesIncrement,
} from './201904';

describe('201904', () => {
  test('parseInput', () => {
    const input = `1234-5742`;
    const result = parseInput(input);
    expect(result).toEqual(['1234', '5742']);
  });

  test('number to sequences', () => {
    const seq = numberToSequences(1223);
    expect(seq).toEqual([
      { digit: 0, length: 0 },
      { digit: 1, length: 1 },
      { digit: 2, length: 2 },
      { digit: 3, length: 1 },
    ]);
  });

  test('sequencesIncrement true', () => {
    const seq = numberToSequences(1223);
    const result = sequencesIncrement(seq);
    expect(result).toEqual(true);
  });

  test('sequencesIncrement false', () => {
    const seq = numberToSequences(12232);
    const result = sequencesIncrement(seq);
    expect(result).toEqual(false);
  });

  test('hasDouble true', () => {
    const seq = numberToSequences(12232);
    const result = hasDouble(seq);
    expect(result).toEqual(true);
  });

  test('hasDouble false tripple', () => {
    const seq = numberToSequences(122232);
    const result = hasDouble(seq);
    expect(result).toEqual(false);
  });

  test('hasDouble false', () => {
    const seq = numberToSequences(1234);
    const result = hasDouble(seq);
    expect(result).toEqual(false);
  });

  test('minDouble true', () => {
    const seq = numberToSequences(12232);
    const result = hasMinDouble(seq);
    expect(result).toEqual(true);
  });

  test('minDouble true tripple', () => {
    const seq = numberToSequences(122232);
    const result = hasMinDouble(seq);
    expect(result).toEqual(true);
  });

  test('minDouble false', () => {
    const seq = numberToSequences(1234);
    const result = hasMinDouble(seq);
    expect(result).toEqual(false);
  });
});
