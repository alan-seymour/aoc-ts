import { Puzzle202011, parseInput, incrementState, countImmediateSurroundingOccupied, countVisibleSurrounding, gridToString } from './202011';

let day: Puzzle202011;

describe('202011', () => {
  beforeEach(() => {
    day = new Puzzle202011('');
  });

  test('parseInput', () => {
    const input = `L.L
    ..L`;
    const result = parseInput(input);
    expect(result).toEqual([
      ['L', '.', 'L'],
      ['.', '.', 'L']
    ]);
  });

  test('incrementState once', () => {
    const state = parseInput(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = incrementState(state, countImmediateSurroundingOccupied, 4);
    expect(result).toEqual(parseInput(`#.##.##.##
    #######.##
    #.#.#..#..
    ####.##.##
    #.##.##.##
    #.#####.##
    ..#.#.....
    ##########
    #.######.#
    #.#####.##`));
  });

  test('incrementState twice', () => {
    const state = parseInput(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = incrementState(state, countImmediateSurroundingOccupied, 4);
    const result2 = incrementState(result, countImmediateSurroundingOccupied, 4);
    expect(result2).toEqual(parseInput(`#.LL.L#.##
    #LLLLLL.L#
    L.L.L..L..
    #LLL.LL.L#
    #.LL.LL.LL
    #.LLLL#.##
    ..L.L.....
    #LLLLLLLL#
    #.LLLLLL.L
    #.#LLLL.##`));
  });

  test('part 1 example 1', () => {
    day.loadData(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = day.part1();
    expect(result).toBe("37");
  });

  test('incrementState once countVisibleSurrounding', () => {
    const state = parseInput(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = incrementState(state, countVisibleSurrounding, 4);
    expect(result).toEqual(parseInput(`#.##.##.##
    #######.##
    #.#.#..#..
    ####.##.##
    #.##.##.##
    #.#####.##
    ..#.#.....
    ##########
    #.######.#
    #.#####.##`));
  });

  test('incrementState twice countVisibleSurrounding', () => {
    const state = parseInput(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = incrementState(state, countVisibleSurrounding, 5);
    const result2 = incrementState(result, countVisibleSurrounding, 5);
    expect(result2).toEqual(parseInput(`#.LL.LL.L#
    #LLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLL#
    #.LLLLLL.L
    #.LLLLL.L#`));
  });

  test('incrementState 3 times countVisibleSurrounding', () => {
    const state = parseInput(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = incrementState(state, countVisibleSurrounding, 5);
    const result2 = incrementState(result, countVisibleSurrounding, 5);
    const result3 = incrementState(result2, countVisibleSurrounding, 5);
    expect(result3).toEqual(parseInput(`#.L#.##.L#
    #L#####.LL
    L.#.#..#..
    ##L#.##.##
    #.##.#L.##
    #.#####.#L
    ..#.#.....
    LLL####LL#
    #.L#####.L
    #.L####.L#`));
  });

  test('part 2 example 1', () => {
    day.loadData(`L.LL.LL.LL
    LLLLLLL.LL
    L.L.L..L..
    LLLL.LL.LL
    L.LL.LL.LL
    L.LLLLL.LL
    ..L.L.....
    LLLLLLLLLL
    L.LLLLLL.L
    L.LLLLL.LL`);
    const result = day.part2();
    expect(result).toBe('26');
  });
});
