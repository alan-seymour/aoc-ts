import { Puzzle202016, parseInput } from './202016';

let day: Puzzle202016;

describe('202016', () => {
  beforeEach(() => {
    day = new Puzzle202016('');
  });

  test('parseInput', () => {
    const input = `class: 1-3 or 5-7
    row: 6-11 or 33-44
    seat: 13-40 or 45-50

    your ticket:
    7,1,14

    nearby tickets:
    7,3,47
    40,4,50
    55,2,20
    38,6,12`;
    const result = parseInput(input);
    expect(result).toEqual({
      rules: [{
        ruleName: 'class',
        range1Min: 1,
        range1Max: 3,
        range2Min: 5,
        range2Max: 7
      },
      {
        ruleName: 'row',
        range1Min: 6,
        range1Max: 11,
        range2Min: 33,
        range2Max: 44
      },
      {
        ruleName: 'seat',
        range1Min: 13,
        range1Max: 40,
        range2Min: 45,
        range2Max: 50
      }],
      yourTicket: [7, 1, 14],
      otherTickets: [
        [7, 3, 47],
        [40, 4, 50],
        [55, 2, 20],
        [38, 6, 12]
      ]
    });
  });

  test('part 1 example 1', () => {
    day.loadData(`class: 1-3 or 5-7
    row: 6-11 or 33-44
    seat: 13-40 or 45-50

    your ticket:
    7,1,14

    nearby tickets:
    7,3,47
    40,4,50
    55,2,20
    38,6,12`);
    const result = day.part1();
    expect(result).toBe('71');
  });

  test('part 2 example 1', () => {
    day.loadData(`departure class: 0-1 or 4-19
    departure row: 0-5 or 8-19
    seat: 0-13 or 16-19

    your ticket:
    11,12,13

    nearby tickets:
    3,9,18
    15,1,5
    5,14,9`);
    const result = day.part2();
    expect(result).toBe('132');
  });
});
