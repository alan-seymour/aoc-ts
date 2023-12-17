import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Dir = 'N' | 'S' | 'W' | 'E';

type Pos = {
  i: number;
  j: number;
  dir: Dir;
};

export const parseInput = (input: string): string[][] => {
  const map = splitLines(input).map(l => l.split(''));
  return map;
};

const posToNext = ({ i, j, dir }: Pos, val: string): Pos[] => {
  switch (val) {
    case '.':
      switch (dir) {
        case 'N':
          return [{ i: i + 1, j, dir }];
        case 'S':
          return [{ i: i - 1, j, dir }];
        case 'W':
          return [{ i, j: j + 1, dir }];
        case 'E':
          return [{ i, j: j - 1, dir }];
      }
      break;

    case '\\':
      switch (dir) {
        case 'N':
          return [{ i, j: j + 1, dir: 'W' }];
        case 'S':
          return [{ i, j: j - 1, dir: 'E' }];
        case 'W':
          return [{ i: i + 1, j, dir: 'N' }];
        case 'E':
          return [{ i: i - 1, j, dir: 'S' }];
      }
      break;

    case '/':
      switch (dir) {
        case 'N':
          return [{ i, j: j - 1, dir: 'E' }];
        case 'S':
          return [{ i, j: j + 1, dir: 'W' }];
        case 'W':
          return [{ i: i - 1, j, dir: 'S' }];
        case 'E':
          return [{ i: i + 1, j, dir: 'N' }];
      }
      break;

    case '|':
      switch (dir) {
        case 'N':
          return [{ i: i + 1, j, dir }];
        case 'S':
          return [{ i: i - 1, j, dir }];
        case 'W':
        case 'E':
          return [
            { i: i - 1, j, dir: 'S' },
            { i: i + 1, j, dir: 'N' },
          ];
      }
      break;

    case '-':
      switch (dir) {
        case 'N':
        case 'S':
          return [
            { i, j: j - 1, dir: 'E' },
            { i, j: j + 1, dir: 'W' },
          ];
        case 'W':
          return [{ i, j: j + 1, dir }];
        case 'E':
          return [{ i, j: j - 1, dir }];
      }
      break;
    default:
      return [];
  }
};

const runUntilDone = (map: string[][], start: Pos): Map<string, Dir[]> => {
  const seen = new Map<string, Dir[]>();
  const nextSteps: Pos[] = [start];
  let next = nextSteps.shift();

  while (next) {
    const locationHash = `${next.i};${next.j}`;
    const seenLocation = seen.get(locationHash) ?? [];

    if (!seenLocation.includes(next.dir)) {
      const newSteps = posToNext(next, map[next.i][next.j]).filter(
        step => step.i >= 0 && step.i < map.length && step.j >= 0 && step.j < map[0].length,
      );

      nextSteps.push(...newSteps);
      seen.set(locationHash, [...seenLocation, next.dir]);
    }

    next = nextSteps.shift();
  }

  return seen;
};

const generateAllStarts = (height: number, width: number): Pos[] => [
  ...new Array(width).fill(0).map<Pos>((_, j) => ({ i: 0, j, dir: 'N' })),
  ...new Array(width).fill(0).map<Pos>((_, j) => ({ i: height - 1, j, dir: 'S' })),
  ...new Array(height).fill(0).map<Pos>((_, i) => ({ i, j: 0, dir: 'W' })),
  ...new Array(height).fill(0).map<Pos>((_, i) => ({ i, j: width - 1, dir: 'E' })),
];

export class Puzzle202316 extends PuzzleDay {
  part1() {
    const map = parseInput(this.input);
    const seen = runUntilDone(map, { i: 0, j: 0, dir: 'W' });
    return `${seen.size}`;
  }

  part2() {
    const map = parseInput(this.input);
    const starts = generateAllStarts(map.length, map[0].length);
    const values = starts.map(start => runUntilDone(map, start).size);
    const max = Math.max(...values);
    return `${max}`;
  }
}
