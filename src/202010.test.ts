import { Puzzle202010, parseInput } from './202010';

let day: Puzzle202010;

describe('202010', () => {
  beforeEach(() => {
    day = new Puzzle202010('');
  });

  test('parseInput', () => {
    const input = `1
    123
    14`;
    const result = parseInput(input);
    expect(result).toEqual([1, 123, 14]);
  });

  test('part 1 example 1', () => {
    day.loadData(`16
    10
    15
    5
    1
    11
    7
    19
    6
    12
    4`);
    const result = day.part1();
    expect(result).toBe('35');
  });

  test('part 1 example 2', () => {
    day.loadData(`28
    33
    18
    42
    31
    14
    46
    20
    48
    47
    24
    23
    49
    45
    19
    38
    39
    11
    1
    32
    25
    35
    8
    17
    7
    9
    4
    2
    34
    10
    3`);
    const result = day.part1();
    expect(result).toBe('220');
  });

  test('part 2 example 1', () => {
    day.loadData(`16
    10
    15
    5
    1
    11
    7
    19
    6
    12
    4`);
    const result = day.part2();
    expect(result).toBe('8');
  });

  test('part 2 example 2', () => {
    day.loadData(`28
    33
    18
    42
    31
    14
    46
    20
    48
    47
    24
    23
    49
    45
    19
    38
    39
    11
    1
    32
    25
    35
    8
    17
    7
    9
    4
    2
    34
    10
    3`);
    const result = day.part2();
    expect(result).toBe('19208');
  });
});
