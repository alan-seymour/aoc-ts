import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][] => {
  const grid = splitLines(input).map(line => line.split(''));
  return grid;
};

const getNeighbours3d = (x: number, y: number, z: number) => [
  [x, y, z - 1],
  [x, y, z + 1],
  [x, y - 1, z],
  [x, y + 1, z],
  [x, y - 1, z - 1],
  [x, y - 1, z + 1],
  [x, y + 1, z - 1],
  [x, y + 1, z + 1],
  [x - 1, y, z],
  [x - 1, y, z - 1],
  [x - 1, y, z + 1],
  [x - 1, y - 1, z - 1],
  [x - 1, y - 1, z],
  [x - 1, y - 1, z + 1],
  [x - 1, y + 1, z - 1],
  [x - 1, y + 1, z],
  [x - 1, y + 1, z + 1],
  [x + 1, y, z],
  [x + 1, y, z - 1],
  [x + 1, y, z + 1],
  [x + 1, y - 1, z],
  [x + 1, y - 1, z - 1],
  [x + 1, y - 1, z + 1],
  [x + 1, y + 1, z],
  [x + 1, y + 1, z - 1],
  [x + 1, y + 1, z + 1]
];

const getNeighbours4d = (x: number, y: number, z: number, w: number) => [
  [x, y, z - 1, w],
  [x, y, z + 1, w],
  [x, y - 1, z, w],
  [x, y + 1, z, w],
  [x, y - 1, z - 1, w],
  [x, y - 1, z + 1, w],
  [x, y + 1, z - 1, w],
  [x, y + 1, z + 1, w],
  [x - 1, y, z, w],
  [x - 1, y, z - 1, w],
  [x - 1, y, z + 1, w],
  [x - 1, y - 1, z - 1, w],
  [x - 1, y - 1, z, w],
  [x - 1, y - 1, z + 1, w],
  [x - 1, y + 1, z - 1, w],
  [x - 1, y + 1, z, w],
  [x - 1, y + 1, z + 1, w],
  [x + 1, y, z, w],
  [x + 1, y, z - 1, w],
  [x + 1, y, z + 1, w],
  [x + 1, y - 1, z, w],
  [x + 1, y - 1, z - 1, w],
  [x + 1, y - 1, z + 1, w],
  [x + 1, y + 1, z, w],
  [x + 1, y + 1, z - 1, w],
  [x + 1, y + 1, z + 1, w],
  [x, y, z - 1, w - 1],
  [x, y, z + 1, w - 1],
  [x, y - 1, z, w - 1],
  [x, y + 1, z, w - 1],
  [x, y - 1, z - 1, w - 1],
  [x, y - 1, z + 1, w - 1],
  [x, y + 1, z - 1, w - 1],
  [x, y + 1, z + 1, w - 1],
  [x - 1, y, z, w - 1],
  [x - 1, y, z - 1, w - 1],
  [x - 1, y, z + 1, w - 1],
  [x - 1, y - 1, z - 1, w - 1],
  [x - 1, y - 1, z, w - 1],
  [x - 1, y - 1, z + 1, w - 1],
  [x - 1, y + 1, z - 1, w - 1],
  [x - 1, y + 1, z, w - 1],
  [x - 1, y + 1, z + 1, w - 1],
  [x + 1, y, z, w - 1],
  [x + 1, y, z - 1, w - 1],
  [x + 1, y, z + 1, w - 1],
  [x + 1, y - 1, z, w - 1],
  [x + 1, y - 1, z - 1, w - 1],
  [x + 1, y - 1, z + 1, w - 1],
  [x + 1, y + 1, z, w - 1],
  [x + 1, y + 1, z - 1, w - 1],
  [x + 1, y + 1, z + 1, w - 1],
  [x, y, z - 1, w + 1],
  [x, y, z + 1, w + 1],
  [x, y - 1, z, w + 1],
  [x, y + 1, z, w + 1],
  [x, y - 1, z - 1, w + 1],
  [x, y - 1, z + 1, w + 1],
  [x, y + 1, z - 1, w + 1],
  [x, y + 1, z + 1, w + 1],
  [x - 1, y, z, w + 1],
  [x - 1, y, z - 1, w + 1],
  [x - 1, y, z + 1, w + 1],
  [x - 1, y - 1, z - 1, w + 1],
  [x - 1, y - 1, z, w + 1],
  [x - 1, y - 1, z + 1, w + 1],
  [x - 1, y + 1, z - 1, w + 1],
  [x - 1, y + 1, z, w + 1],
  [x - 1, y + 1, z + 1, w + 1],
  [x + 1, y, z, w + 1],
  [x + 1, y, z - 1, w + 1],
  [x + 1, y, z + 1, w + 1],
  [x + 1, y - 1, z, w + 1],
  [x + 1, y - 1, z - 1, w + 1],
  [x + 1, y - 1, z + 1, w + 1],
  [x + 1, y + 1, z, w + 1],
  [x + 1, y + 1, z - 1, w + 1],
  [x + 1, y + 1, z + 1, w + 1],
  [x, y, z, w - 1],
  [x, y, z, w + 1],
];

type Dimensions3D = {
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  zMin: number,
  zMax: number,
};

type Dimensions4D = {
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  zMin: number,
  zMax: number,
  wMin: number,
  wMax: number,
};

const doStep3d = (grid: string[][][], dimensions: Dimensions3D): string[][][] => {
  const output: string[][][] = [];
  for (let x = dimensions.xMin; x <= dimensions.xMax; x++) {
    for (let y = dimensions.yMin; y <= dimensions.yMax; y++) {
      for (let z = dimensions.zMin; z <= dimensions.zMax; z++) {
        const neighbours = getNeighbours3d(x, y, z);
        const activeNeighbourCount = neighbours.filter(([nx, ny, nz]) => grid[nx]?.[ny]?.[nz] === '#').length;
        let newValue: string;
        if (grid[x]?.[y]?.[z] === '#') {
          if (activeNeighbourCount === 2 || activeNeighbourCount === 3) {
            newValue = '#';
          } else {
            newValue = '.';
          }
        } else {
          if (activeNeighbourCount === 3) {
            newValue = '#';
          } else {
            newValue = '.';
          }
        }
        if (!output[x]) {
          output[x] = [];
        }
        if (!output[x][y]) {
          output[x][y] = [];
        }
        output[x][y][z] = newValue;
      }
    }
  }
  return output;
};

const doStep4d = (grid: string[][][][], dimensions: Dimensions4D): string[][][][] => {
  const output: string[][][][] = [];
  for (let x = dimensions.xMin; x <= dimensions.xMax; x++) {
    for (let y = dimensions.yMin; y <= dimensions.yMax; y++) {
      for (let z = dimensions.zMin; z <= dimensions.zMax; z++) {
        for (let w = dimensions.wMin; w <= dimensions.wMax; w++) {
          const neighbours = getNeighbours4d(x, y, z, w);
          const activeNeighbourCount = neighbours.filter(([nx, ny, nz, nw]) => grid[nx]?.[ny]?.[nz]?.[nw] === '#').length;
          let newValue: string;
          if (grid[x]?.[y]?.[z]?.[w] === '#') {
            if (activeNeighbourCount === 2 || activeNeighbourCount === 3) {
              newValue = '#';
            } else {
              newValue = '.';
            }
          } else {
            if (activeNeighbourCount === 3) {
              newValue = '#';
            } else {
              newValue = '.';
            }
          }
          if (!output[x]) {
            output[x] = [];
          }
          if (!output[x][y]) {
            output[x][y] = [];
          }
          if (!output[x][y][z]) {
            output[x][y][z] = [];
          }
          output[x][y][z][w] = newValue;
        }
      }
    }
  }
  return output;
};

const doXSteps3d = (grid: string[][][], stepCount: number): { grid: string[][][], dimensions: Dimensions3D } => {
  let d: Dimensions3D = {
    xMin: -1,
    xMax: grid.length,
    yMin: -1,
    yMax: grid[0].length,
    zMin: -1,
    zMax: 1,
  };
  for (let i = 0; i < stepCount; i++) {
    grid = doStep3d(grid, d);
    d = {
      xMin: d.xMin - 1,
      xMax: d.xMax + 1,
      yMin: d.yMin - 1,
      yMax: d.yMax + 1,
      zMin: d.zMin - 1,
      zMax: d.zMax + 1
    };
  }
  return { grid, dimensions: d };
};

const doXSteps4d = (grid: string[][][][], stepCount: number): { grid: string[][][][], dimensions: Dimensions4D } => {
  let d: Dimensions4D = {
    xMin: -1,
    xMax: grid.length,
    yMin: -1,
    yMax: grid[0].length,
    zMin: -1,
    zMax: 1,
    wMin: -1,
    wMax: 1,
  };
  for (let i = 0; i < stepCount; i++) {
    grid = doStep4d(grid, d);
    d = {
      xMin: d.xMin - 1,
      xMax: d.xMax + 1,
      yMin: d.yMin - 1,
      yMax: d.yMax + 1,
      zMin: d.zMin - 1,
      zMax: d.zMax + 1,
      wMin: d.wMin - 1,
      wMax: d.wMax + 1,
    };
  }
  return { grid, dimensions: d };
};

const countActive3d = (grid: string[][][], d: Dimensions3D): number => {
  let total = 0;
  for (let x = d.xMin; x <= d.xMax; x++) {
    for (let y = d.yMin; y <= d.yMax; y++) {
      for (let z = d.zMin; z <= d.zMax; z++) {
        if (grid[x]?.[y]?.[z] === '#') {
          total++;
        }
      }
    }
  }
  return total;
}

const countActive4d = (grid: string[][][][], d: Dimensions4D): number => {
  let total = 0;
  for (let x = d.xMin; x <= d.xMax; x++) {
    for (let y = d.yMin; y <= d.yMax; y++) {
      for (let z = d.zMin; z <= d.zMax; z++) {
        for (let w = d.wMin; w <= d.wMax; w++) {
          if (grid[x]?.[y]?.[z]?.[w] === '#') {
            total++;
          }
        }
      }
    }
  }
  return total;
}

export class Puzzle202017 extends PuzzleDay {
  part1() {
    const grid = parseInput(this.input);
    const startingGrid = grid.map(line => line.map(c => [c]));
    const { grid: finalGrid, dimensions } = doXSteps3d(startingGrid, 6);
    const active = countActive3d(finalGrid, dimensions);
    return `${active}`;
  }

  part2() {
    const grid = parseInput(this.input);
    const startingGrid = grid.map(line => line.map(c => [[c]]));
    const { grid: finalGrid, dimensions } = doXSteps4d(startingGrid, 6);
    const active = countActive4d(finalGrid, dimensions);
    return `${active}`;
    return ``;
  }
}
