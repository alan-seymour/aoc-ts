import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Fold = {
  dir: string;
  pos: number;
};

type Coord = {
  x: number;
  y: number;
};

export const parseInput = (input: string): [Coord[], Fold[]] => {
  const lines = splitLines(input).reduce<[Coord[], Fold[]]>(
    ([c, f], l) => {
      if (l[0] === 'f') {
        const [, dir, pos] = l.match(/.*(.)=(.*)/) ?? [];
        return [c, [...f, { dir, pos: parseInt(pos, 10) }]];
      } else if (l === '') {
        return [c, f];
      } else {
        const [x, y] = l.split(',').map(d => parseInt(d, 10));
        return [[...c, { x, y }], f];
      }
    },
    [[], []],
  );

  return lines;
};

const maxXY = (coords: Coord[]): Coord =>
  coords.reduce<Coord>(({ x, y }, c) => ({ x: c.x > x ? c.x : x, y: c.y > y ? c.y : y }), {
    x: 0,
    y: 0,
  });

const fold = (coords: Coord[], dir: string, pos: number): Coord[] =>
  coords.map(({ x, y }) => {
    if (dir === 'x') {
      return { x: x > pos ? pos - (x - pos) : x, y };
    } else if (dir === 'y') {
      return { x, y: y > pos ? pos - (y - pos) : y };
    }

    return { x, y };
  });

const dedupeCoords = (coords: Coord[]): Coord[] => {
  const seen = new Set<string>();
  const unique: Coord[] = [];

  coords.forEach(({ x, y }) => {
    const key = `${x},${y}`;

    if (!seen.has(key)) {
      unique.push({ x, y });
      seen.add(key);
    }
  });

  return unique;
};

const printGrid = (coords: Coord[]): string => {
  const max = maxXY(coords);
  const output: string[][] = [];

  for (let i = 0; i <= max.y; i++) {
    output[i] = [];

    for (let j = 0; j <= max.x; j++) {
      output[i][j] = '.';
    }
  }

  coords.forEach(({ x, y }) => (output[y][x] = '#'));
  return output.map(l => l.join('')).join('\n');
};

export class Puzzle202113 extends PuzzleDay {
  part1() {
    const [coords, folds] = parseInput(this.input);
    const output = fold(coords, folds[0].dir, folds[0].pos);
    const unique = dedupeCoords(output);
    return `${unique.length}`;
  }

  part2() {
    const [coords, folds] = parseInput(this.input);

    const output = folds.reduce<Coord[]>((c, f) => fold(c, f.dir, f.pos), coords);

    const unique = dedupeCoords(output);
    const display = printGrid(unique);
    return `${display}`;
  }
}
