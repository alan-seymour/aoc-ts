import { Puzzle202102, parseInput } from './202102';

let day: Puzzle202102;

describe('202102', () => {
  beforeEach(() => {
    day = new Puzzle202102('');
  });

  test('parseInput', () => {
    const input = `forward 1
    up 2
    down 3`;
    const result = parseInput(input);
    expect(result).toEqual([
      { direction: 'forward', distance: 1 },
      { direction: 'up', distance: 2 },
      { direction: 'down', distance: 3 },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`);
    const result = day.part1();
    expect(result).toBe('150');
  });

  test('part 2 example 1', () => {
    day.loadData(`forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2`);
    const result = day.part2();
    expect(result).toBe('900');
  });
});
