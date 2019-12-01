import { run, splitLines } from "./helpers";

const inputFile = "./inputs/201803.txt";

type Claim = {
  claimId: number;
  leftOffset: number;
  topOffset: number;
  width: number;
  height: number;
};

export const parseClaims = (input: string) => {
  const lines = splitLines(input);
  const claims = lines.map(line => decomposeLine(line));
  return claims;
};

export const decomposeLine = (line: string): Claim => {
  const matches = line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/) || [];

  if (matches.length == 6) {
    return {
      claimId: parseInt(matches[1], 10),
      leftOffset: parseInt(matches[2], 10),
      topOffset: parseInt(matches[3], 10),
      width: parseInt(matches[4], 10),
      height: parseInt(matches[5], 10)
    };
  }
  throw Error(`invalid input ${line}`);
};

export const initGrid = (size: number) => {
  const grid: number[][][] = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
    for (let j = 0; j < size; j++) {
      grid[i][j] = [];
    }
  }
  return grid;
};

export const fillGrid = (grid: number[][][], claims: Claim[]) => {
  claims.forEach(claim => addClaimToGrid(grid, claim));
};

export const addClaimToGrid = (grid: number[][][], claim: Claim) => {
  for (let i = claim.leftOffset; i < claim.leftOffset + claim.width; i++) {
    for (let j = claim.topOffset; j < claim.topOffset + claim.height; j++) {
      grid[i][j].push(claim.claimId);
    }
  }
};

export const countOverlaps = (grid: number[][][]): number => {
  return grid.reduce((count: number, row: number[][]): number => {
    return (
      count +
      row.reduce((rowCount: number, cell: number[]) => {
        if (cell.length > 1) {
          return rowCount + 1;
        }
        return rowCount;
      }, 0)
    );
  }, 0);
};

export const findUniqueId = (grid: number[][][], maxId: number): number => {
  const overlapped: boolean[] = new Array(maxId).fill(false);
  grid.forEach(row => {
    row.forEach(cell => {
      if (cell.length > 1) {
        cell.forEach(v => {
          overlapped[v - 1] = true;
        });
      }
    });
  });
  const index = overlapped.findIndex((v: boolean) => v === false);
  return index + 1;
};

export const part1 = (input: string) => {
  const claims = parseClaims(input);
  const grid = initGrid(1000);
  fillGrid(grid, claims);
  return "" + countOverlaps(grid);
};

export const part2 = (input: string) => {
  const claims = parseClaims(input);
  const grid = initGrid(1000);
  fillGrid(grid, claims);
  const id = findUniqueId(grid, claims.length);
  return `${id}`;
};

if (require.main === module) {
  run(inputFile, [part1, part2]);
}
