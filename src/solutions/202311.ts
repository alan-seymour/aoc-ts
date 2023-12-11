import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Coord = {
  i: number;
  j: number;
};

export const parseInput = (input: string): string[][] => {
  const map = splitLines(input).map(l => l.split(''));
  return map;
};

const findExpands = (map: string[][]): [number[], number[]] => {
  const rowsWithNoGalaxies = map.reduce<number[]>(
    (r, curr, i) => (curr.every(c => c === '.') ? [...r, i] : [...r]),
    [],
  );

  const colsWithNoGalaxies: number[] = [];

  for (let j = 0; j <= map[0].length; j++) {
    if (map.every(r => r[j] === '.')) {
      colsWithNoGalaxies.push(j);
    }
  }

  return [rowsWithNoGalaxies, colsWithNoGalaxies];
};

const findGalaxies = (map: string[][]): Set<Coord> => {
  const galaxies = new Set<Coord>();

  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (map[i][j] === '#') {
        galaxies.add({ i, j });
      }
    });
  });

  return galaxies;
};

const findDistances = (
  galaxies: Set<Coord>,
  expandedRows: number[],
  expandedCols: number[],
  expansionScale = 2,
): number[] => {
  const distances: number[] = [];
  const galaxyArray = Array.from(galaxies);

  for (let i = 0; i < galaxyArray.length - 1; i++) {
    for (let j = i + 1; j < galaxyArray.length; j++) {
      const expandedRowsCrossed = expandedRows.filter(
        r =>
          r > Math.min(galaxyArray[i].i, galaxyArray[j].i) &&
          r < Math.max(galaxyArray[i].i, galaxyArray[j].i),
      ).length;

      const expandedColsCrossed = expandedCols.filter(
        r =>
          r > Math.min(galaxyArray[i].j, galaxyArray[j].j) &&
          r < Math.max(galaxyArray[i].j, galaxyArray[j].j),
      ).length;

      distances.push(
        Math.abs(galaxyArray[i].i - galaxyArray[j].i) +
          Math.abs(galaxyArray[i].j - galaxyArray[j].j) +
          (expandedRowsCrossed + expandedColsCrossed) * (expansionScale - 1),
      );
    }
  }

  return distances;
};

export class Puzzle202311 extends PuzzleDay {
  part1() {
    const map = parseInput(this.input);
    const [rows, cols] = findExpands(map);
    const galaxies = findGalaxies(map);
    const distances = findDistances(galaxies, rows, cols, 2);
    const sum = distances.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }

  part2() {
    const map = parseInput(this.input);
    const [rows, cols] = findExpands(map);
    const galaxies = findGalaxies(map);
    const distances = findDistances(galaxies, rows, cols, 1000000);
    const sum = distances.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }
}
