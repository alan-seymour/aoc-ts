import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Direction = 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export const parseInput = (input: string): Direction[][] => {
  const tilePaths = splitLines(input).map(
    l =>
      l.split('').reduce<{ directions: Direction[]; modifier: 'n' | 's' | '' }>(
        ({ directions, modifier }, curr) => {
          if (curr === 'n') {
            return {
              directions,
              modifier: 'n',
            };
          }

          if (curr === 's') {
            return {
              directions,
              modifier: 's',
            };
          }

          if (curr === 'e' && modifier === 'n') {
            return {
              directions: [...directions, 'ne'],
              modifier: '',
            };
          }

          if (curr === 'e' && modifier === 's') {
            return {
              directions: [...directions, 'se'],
              modifier: '',
            };
          }

          if (curr === 'w' && modifier === 'n') {
            return {
              directions: [...directions, 'nw'],
              modifier: '',
            };
          }

          if (curr === 'w' && modifier === 's') {
            return {
              directions: [...directions, 'sw'],
              modifier: '',
            };
          }

          if (curr === 'w' || curr === 'e') {
            return {
              directions: [...directions, curr],
              modifier: '',
            };
          }

          return { directions, modifier };
        },
        { directions: [], modifier: '' },
      ).directions,
  );

  return tilePaths;
};

type Coord3d = [number, number, number];

const directionMoves: { [key in Direction]: (pos: Coord3d) => Coord3d } = {
  e: ([x, y, z]) => [x + 1, y - 1, z],
  w: ([x, y, z]) => [x - 1, y + 1, z],
  ne: ([x, y, z]) => [x + 1, y, z - 1],
  sw: ([x, y, z]) => [x - 1, y, z + 1],
  nw: ([x, y, z]) => [x, y + 1, z - 1],
  se: ([x, y, z]) => [x, y - 1, z + 1],
};

export const resolveTilePath = (path: Direction[]): Coord3d =>
  path.reduce<Coord3d>((pos, dir) => directionMoves[dir](pos), [0, 0, 0]);

export const hashTile = ([x, y, z]: Coord3d): string => `${x},${y},${z}`;

export const resolveAllPaths = (paths: Direction[][]): Set<string> =>
  paths
    .map(p => resolveTilePath(p))
    .reduce<Set<string>>((floor, tile) => {
      const hash = hashTile(tile);

      if (floor.has(hash)) {
        floor.delete(hash);
      } else {
        floor.add(hash);
      }

      return floor;
    }, new Set<string>());

const countBlack = (floor: Set<string>): number =>
  Array.from(floor.values()).filter(t => t === 'black').length;

type Extremes = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  zMin: number;
  zMax: number;
};

type Floor = Map<string, string>;

type State = {
  floor: Floor;
  extremes: Extremes;
};

const countNeighbourBlacks = (floor: Set<string>, pos: Coord3d): number =>
  Object.values(directionMoves).reduce((total, dirFn) => {
    const neighbour = dirFn(pos);
    const hash = hashTile(neighbour);

    if (floor.has(hash)) {
      return total + 1;
    }

    return total;
  }, 0);

const incrementDay = (
  floor: Set<string>,
  { xMin, xMax, yMin, yMax, zMin, zMax }: Extremes,
): Set<string> => {
  const output = new Set<string>();

  for (let x = xMin; x <= xMax; x++) {
    for (let y = yMin; y <= yMax; y++) {
      for (let z = zMin; z <= zMax; z++) {
        const hash = hashTile([x, y, z]);
        const exists = floor.has(hash);
        const blackNeighbours = countNeighbourBlacks(floor, [x, y, z]);

        if (exists && (blackNeighbours === 1 || blackNeighbours === 2)) {
          output.add(hash);
        } else if (!exists && blackNeighbours === 2) {
          output.add(hash);
        }
      }
    }
  }

  return output;
};

const calcExtremes = (floor: Set<string>): Extremes =>
  Array.from(floor).reduce<Extremes>(
    ({ xMin, xMax, yMin, yMax, zMin, zMax }, curr) => {
      const [x, y, z] = curr.split(',').map(v => parseInt(v, 10));

      return {
        xMin: Math.min(x, xMin),
        xMax: Math.max(x, xMax),
        yMin: Math.min(y, yMin),
        yMax: Math.max(y, yMax),
        zMin: Math.min(z, zMin),
        zMax: Math.max(z, zMax),
      };
    },
    { xMin: 0, xMax: 0, yMin: 0, yMax: 0, zMin: 0, zMax: 0 },
  );

const incrementExtremes = ({ xMin, xMax, yMin, yMax, zMin, zMax }: Extremes): Extremes => ({
  xMin: xMin - 1,
  xMax: xMax + 1,
  yMin: yMin - 1,
  yMax: yMax + 1,
  zMin: zMin - 1,
  zMax: zMax + 1,
});

const runDays = (floor: Set<string>, dayCount: number): Set<string> => {
  let newFloor = floor;
  let extremes = incrementExtremes(calcExtremes(newFloor));

  for (let i = 0; i < dayCount; i++) {
    newFloor = incrementDay(newFloor, extremes);
    extremes = incrementExtremes(calcExtremes(newFloor));
  }

  return newFloor;
};

export class Puzzle202024 extends PuzzleDay {
  part1() {
    const paths = parseInput(this.input);
    const floor = resolveAllPaths(paths);
    const totalBlack = floor.size;
    return `${totalBlack}`;
  }

  part2() {
    const paths = parseInput(this.input);
    const floor = resolveAllPaths(paths);
    const finalFloor = runDays(floor, 100);
    const totalBlack = finalFloor.size;
    return `${totalBlack}`;
  }
}
