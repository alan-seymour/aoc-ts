import { parseInput, gridToVisibleAsteroids, Puzzle201910 } from './201910';

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

  test('gridToVisibleAsteroids', () => {
    const input = `.#..#
    .....
    #####
    ....#
    ...##`;
    const grid = parseInput(input);
    const result = gridToVisibleAsteroids(grid);
    expect(result).toEqual([
      [0, 7, 0, 0, 7],
      [0, 0, 0, 0, 0],
      [6, 7, 7, 7, 5],
      [0, 0, 0, 0, 7],
      [0, 0, 0, 8, 7],
    ]);
  });

  test('part 1 example 1', () => {
    const input = `......#.#.
    #..#.#....
    ..#######.
    .#.#.###..
    .#..#.....
    ..#....#.#
    #..#....#.
    .##.#..###
    ##...#..#.
    .#....####`;

    const day = new Puzzle201910('');
    day.loadData(input);
    const result = day.part1();
    expect(result).toEqual('33');
  });

  test('part 1 example 2', () => {
    const input = `#.#...#.#.
    .###....#.
    .#....#...
    ##.#.#.#.#
    ....#.#.#.
    .##..###.#
    ..#...##..
    ..##....##
    ......#...
    .####.###.`;

    const day = new Puzzle201910('');
    day.loadData(input);
    const result = day.part1();
    expect(result).toEqual('35');
  });

  test('part 1 example 3', () => {
    const input = `.#..#..###
    ####.###.#
    ....###.#.
    ..###.##.#
    ##.##.#.#.
    ....###..#
    ..#.#..#.#
    #..#.#.###
    .##...##.#
    .....#.#..`;

    const day = new Puzzle201910('');
    day.loadData(input);
    const result = day.part1();
    expect(result).toEqual('41');
  });
});
