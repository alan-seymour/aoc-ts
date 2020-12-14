import { Puzzle202013, parseInput } from './202013';

let day: Puzzle202013;

describe('202013', () => {
  beforeEach(() => {
    day = new Puzzle202013('');
  });

  test('parseInput', () => {
    const input = `939
    7,13,x,x,59,x,31,19`;
    const result = parseInput(input);
    expect(result).toEqual({
      earliest: 939,
      buses: ['7', '13', 'x', 'x', '59', 'x', '31', '19']
    });
  });

  test('part 1 example 1', () => {
    day.loadData(`939
    7,13,x,x,59,x,31,19`);
    const result = day.part1();
    expect(result).toBe('295');
  });

  test('part 2 example 1', () => {
    day.loadData(`939
    7,13,x,x,59,x,31,19`);
    const result = day.part2();
    expect(result).toBe('1068781');
  });
});
