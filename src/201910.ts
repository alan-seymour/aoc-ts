import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';
import chunk from 'lodash/chunk';

export const parseInput = (input: string): string[][] => {
  const grid = splitLines(input).map(line => line.split(''));
  return grid;
};

type RelativeVector = {
  angle: number;
  distance: number;
  location: {
    x: number;
    y: number;
  };
};

const gridToSightVectors = (
  grid: string[][],
  originRow: number,
  originCol: number,
): RelativeVector[] => {
  const output: RelativeVector[] = [];
  grid.forEach((line, row) => {
    line.forEach((square, col) => {
      if (row === originRow && col === originCol) return;
      if (square === '#') {
        const relativeY = originRow - row;
        const relativeX = originCol - col;
        const angle = (Math.atan2(relativeY, relativeX) * 180) / Math.PI;
        const absAngle = Math.max(angle, (360 + angle) % 360);
        const CCWBearing = Math.max(
          absAngle - 90,
          (360 + (absAngle - 90)) % 360,
        );
        const distance = Math.sqrt(
          relativeY * relativeY + relativeX * relativeX,
        );
        output.push({
          angle: CCWBearing,
          distance,
          location: {
            x: col,
            y: row,
          },
        });
      }
    });
  });
  return output;
};

const countVisibleAsteroids = (
  grid: string[][],
  detectorRow: number,
  detectorColumn: number,
  totalAsteroids: number,
): number => {
  const relativeVectors = gridToSightVectors(grid, detectorRow, detectorColumn);
  const uniqueVectors = new Set<number>();
  relativeVectors.forEach(vector => {
    uniqueVectors.add(vector.angle);
  });
  return uniqueVectors.size;
};

export const gridToVisibleAsteroids = (grid: string[][]): number[][] => {
  const totalAsteroids = grid.reduce(
    (sum, curr) =>
      sum +
      curr.reduce(
        (subsum, square) => (square === '#' ? subsum + 1 : subsum),
        0,
      ),
    0,
  );
  return grid.map((line, row): number[] => {
    return line.map((square, column): number => {
      if (square === '.') {
        return 0;
      }
      return countVisibleAsteroids(grid, row, column, totalAsteroids);
    });
  });
};

export const highestSight = (grid: number[][]): number => {
  return Math.max(...grid.map(row => Math.max(...row)));
};

export const highestSightLocation = (
  grid: number[][],
): { x: number; y: number } => {
  let max = 0;
  let maxLocation = {
    x: 0,
    y: 0,
  };

  grid.forEach((row, i) => {
    row.forEach((square, j) => {
      if (square > max) {
        max = square;
        maxLocation = {
          x: j,
          y: i,
        };
      }
    });
  });
  return maxLocation;
};

type GroupedVectors = {
  [K in number]: RelativeVector[];
};

const groupSameAngle = (vectors: RelativeVector[]): RelativeVector[][] => {
  const output = new Map<number, RelativeVector[]>();
  vectors.forEach(vector => {
    if (!output.get(vector.angle)) {
      output.set(vector.angle, [vector]);
    } else {
      output.set(vector.angle, [vector, ...output.get(vector.angle)!]);
    }
  });
  return Array.from(output.values());
};

const find200th = (vectors: RelativeVector[][]): RelativeVector => {
  vectors.sort((a, b) => a[0].angle - b[0].angle);
  vectors.forEach(v => v.sort((a, b) => a.distance - b.distance));
  let count = 0;
  let vectorIndex = 0;
  let vector: RelativeVector;
  while (count < 200) {
    if (vectors[vectorIndex].length > 0) {
      vector = vectors[vectorIndex].shift()!;
      count++;
    }
    vectorIndex++;
    vectorIndex = vectorIndex % vectors.length;
  }

  return vector!;
};

export class Puzzle201910 extends PuzzleDay {
  part1() {
    const grid = parseInput(this.input);
    const sightlines = gridToVisibleAsteroids(grid);
    const { x, y } = highestSightLocation(sightlines);
    return `${sightlines[y][x]}`;
  }

  part2() {
    const grid = parseInput(this.input);
    const sightlines = gridToVisibleAsteroids(grid);
    const { x, y } = highestSightLocation(sightlines);

    const relativeVectors = gridToSightVectors(grid, y, x);
    const grouped = groupSameAngle(relativeVectors);
    const asteroid200 = find200th(grouped);
    const output = asteroid200.location.x * 100 + asteroid200.location.y;
    return `${output}`;
  }
}
