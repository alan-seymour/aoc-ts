import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Coord = { x: number; y: number };

export const parseInput = (input: string): number[][] => {
  const map = splitLines(input).map((l) =>
    l.split('').map((c) => parseInt(c, 10))
  );
  return map;
};

const findLowPoints = (map: number[][]): Coord[] => {
  const lowPoints: Coord[] = [];

  map.forEach((row, i) =>
    row.forEach((d, j) => {
      if (
        d < (map[i - 1]?.[j] ?? 10) &&
        d < (map[i + 1]?.[j] ?? 10) &&
        d < (map[i]?.[j - 1] ?? 10) &&
        d < (map[i]?.[j + 1] ?? 10)
      ) {
        lowPoints.push({ x: i, y: j });
      }
    })
  );

  return lowPoints;
};

const findBasinSize = (map: number[][], lowPoint: Coord): number => {
  const seen = new Set<string>();
  const next: Coord[] = [];
  let current: Coord | undefined = lowPoint;
  let size = 1;
  seen.add(`${lowPoint.x},${lowPoint.y}`);
  do {
    const { x, y } = current;
    if ((map[x - 1]?.[y] ?? 9) !== 9 && !seen.has(`${x - 1},${y}`)) {
      next.push({ x: x - 1, y });
      seen.add(`${x - 1},${y}`);
      size++;
    }
    if ((map[x + 1]?.[y] ?? 9) !== 9 && !seen.has(`${x + 1},${y}`)) {
      next.push({ x: x + 1, y });
      seen.add(`${x + 1},${y}`);
      size++;
    }
    if ((map[x]?.[y - 1] ?? 9) !== 9 && !seen.has(`${x},${y - 1}`)) {
      next.push({ x, y: y - 1 });
      seen.add(`${x},${y - 1}`);
      size++;
    }
    if ((map[x]?.[y + 1] ?? 9) !== 9 && !seen.has(`${x},${y + 1}`)) {
      next.push({ x, y: y + 1 });
      seen.add(`${x},${y + 1}`);
      size++;
    }
    current = next.pop();
  } while (current !== undefined);

  return size;
};

export class Puzzle202109 extends PuzzleDay {
  part1() {
    const map = parseInput(this.input);
    const lowPoints = findLowPoints(map);
    const totalRisk =
      lowPoints.reduce((s, c) => s + map[c.x][c.y], 0) + lowPoints.length;
    return `${totalRisk}`;
  }

  part2() {
    const map = parseInput(this.input);
    const lowPoints = findLowPoints(map);

    const basinSizes = lowPoints
      .map((l) => findBasinSize(map, l))
      .sort((a, b) => b - a);

    return `${basinSizes.slice(0, 3).reduce((s, c) => s * c, 1)}`;
  }
}
