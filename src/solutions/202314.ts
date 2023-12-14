import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][] => {
  const map = splitLines(input).map(l => l.split(''));
  return map;
};

const tiltNorth = (map: string[][]): string[][] => {
  let moved = 0;

  do {
    moved = 0;

    for (let i = 1; i < map.length; i++) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 'O' && map[i - 1][j] === '.') {
          map[i - 1][j] = 'O';
          map[i][j] = '.';
          moved++;
        }
      }
    }
  } while (moved !== 0);

  return map;
};

const tiltSouth = (map: string[][]): string[][] => {
  let moved = 0;

  do {
    moved = 0;

    for (let i = map.length - 2; i >= 0; i--) {
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 'O' && map[i + 1][j] === '.') {
          map[i + 1][j] = 'O';
          map[i][j] = '.';
          moved++;
        }
      }
    }
  } while (moved !== 0);

  return map;
};

const tiltWest = (map: string[][]): string[][] => {
  let moved = 0;

  do {
    moved = 0;

    for (let i = 0; i < map.length; i++) {
      for (let j = 1; j < map[0].length; j++) {
        if (map[i][j] === 'O' && map[i][j - 1] === '.') {
          map[i][j - 1] = 'O';
          map[i][j] = '.';
          moved++;
        }
      }
    }
  } while (moved !== 0);

  return map;
};

const tiltEast = (map: string[][]): string[][] => {
  let moved = 0;

  do {
    moved = 0;

    for (let i = 0; i < map.length; i++) {
      for (let j = map[0].length - 2; j >= 0; j--) {
        if (map[i][j] === 'O' && map[i][j + 1] === '.') {
          map[i][j + 1] = 'O';
          map[i][j] = '.';
          moved++;
        }
      }
    }
  } while (moved !== 0);

  return map;
};

const doCycle = (map: string[][]): string[][] => {
  const north = tiltNorth(map);
  const west = tiltWest(north);
  const south = tiltSouth(west);
  const east = tiltEast(south);
  return east;
};

const cycleCache = new Map<string, [string[][], number]>();

const doCycles = (map: string[][], cycleCount: number): string[][] => {
  let cacheKey = '';
  let localMap = map.slice();
  let count = 0;

  let cacheHit = false;

  while (count < cycleCount && !cacheHit) {
    cacheKey = localMap.reduce((key, row) => `${key}${row.join('')}`, '');
    cacheHit = cycleCache.has(cacheKey);
    localMap = cycleCache.get(cacheKey)?.[0] ?? doCycle(localMap);

    if (!cacheHit) {
      cycleCache.set(cacheKey, [localMap, count]);
    }

    count++;
  }

  if (cacheHit) {
    const cycleStart = cycleCache.get(cacheKey)?.[1] ?? 0;
    const cycleSize = count - 1 - cycleStart;
    const numberAfterCycleStart = cycleCount - cycleStart;
    const offset = numberAfterCycleStart % cycleSize;

    for (let i = 0; i < offset; i++) {
      localMap = doCycle(localMap);
    }
  }

  return localMap;
};

const calcNorthWeight = (map: string[][]): number => {
  let weight = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 'O') {
        weight += map.length - i;
      }
    }
  }

  return weight;
};

export class Puzzle202314 extends PuzzleDay {
  part1() {
    const map = parseInput(this.input);
    const tilted = tiltNorth(map);
    const weight = calcNorthWeight(tilted);
    return `${weight}`;
  }

  part2() {
    const map = parseInput(this.input);
    const cycled = doCycles(map, 1000000000);
    const weight = calcNorthWeight(cycled);

    return `${weight}`;
  }
}
