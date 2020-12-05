import { Puzzle202005, parseInput, decodeRow, decodeSeats, findGap } from './202005';

let day: Puzzle202005;

describe('202005', () => {
  beforeEach(() => {
    day = new Puzzle202005('');
  });

  test('parseInput', () => {
    const input = `BFFFBBFRRR
    BFFFBBFRRR`;
    const result = parseInput(input);
    expect(result).toEqual(['BFFFBBFRRR', 'BFFFBBFRRR']);
  });

  test('decodeSeats example 1', () => {
    const result = decodeSeats('BFFFBBFRRR');
    expect(result).toMatchObject({ row: 70, col: 7 });
  });

  test('decodeSeats example 2', () => {
    const result = decodeSeats('FFFBBBFRRR');
    expect(result).toMatchObject({ row: 14, col: 7 });
  });

  test('decodeSeats example 3', () => {
    const result = decodeSeats('BBFFBBFRLL');
    expect(result).toMatchObject({ row: 102, col: 4 });
  });

  test('Part 1 example 1', () => {
    day.loadData(`BFFFBBFRRR
    FFFBBBFRRR
    BBFFBBFRLL`);
    const result = day.part1();
    expect(result).toBe('820');
  });

  test('Find gap', () => {
    expect(findGap([1, 2, 3, 5, 6])).toBe(4);
  });
});
