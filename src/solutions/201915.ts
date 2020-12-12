import { PuzzleDay } from '../puzzleDay';
import { IntCodeComputer } from '../helpers';
import { AStarFinder } from 'astar-typescript';

type Direction = 'N' | 'S' | 'E' | 'W';

type Output = '#' | '.' | '!' | 'o' | 'O';

type Space = {
  location: Coord;
  value: Output;
};

type Grid = Map<string, Space>;

type Coord = { x: number; y: number };

type FutureMove = {
  computer: IntCodeComputer;
  locationMovingTo: Coord;
};

type GridMeta = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

type SearchGridSquare = {
  location: Coord;
  startDistance: number;
  heuristic: number;
  cost: number;
  parent?: string;
};

const directionToInput: { [K in Direction]: number } = {
  N: 1,
  S: 2,
  E: 3,
  W: 4,
};

const numberToOutput: { [K in number]: Output } = {
  [0]: '#',
  [1]: '.',
  [2]: '!',
};

const locationHash = ({ x, y }: Coord): string => {
  return `${x},${y}`;
};

const directionToCoords: { [K in Direction]: (coord: Coord) => Coord } = {
  N: ({ x, y }) => ({ x, y: y - 1 }),
  S: ({ x, y }) => ({ x, y: y + 1 }),
  E: ({ x, y }) => ({ x: x + 1, y }),
  W: ({ x, y }) => ({ x: x - 1, y }),
};

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

const possibleExplorations = (
  location: Coord,
  computer: IntCodeComputer,
): FutureMove[] => {
  return (['N', 'S', 'E', 'W'] as Direction[]).map((d: Direction) => {
    const newLocation = directionToCoords[d](location);
    const newComputer = computer.clone();
    newComputer.input = [directionToInput[d]];
    const newExplore: FutureMove = {
      computer: newComputer,
      locationMovingTo: newLocation,
    };
    return newExplore;
  });
};

const exploreGrid = (computer: IntCodeComputer): Grid => {
  const grid = new Map<string, Space>();
  const explorationList = new Map<string, FutureMove>();
  const explorationIterator = explorationList.values();
  const initialLocation: Coord = { x: 0, y: 0 };
  const initialHash = locationHash(initialLocation);
  grid.set(initialHash, { location: { x: 0, y: 0 }, value: 'o' });
  const initialMoves = possibleExplorations(initialLocation, computer);
  initialMoves.forEach(move => {
    const moveHash = locationHash(move.locationMovingTo);
    explorationList.set(moveHash, move);
  });

  for (const exploration of explorationIterator) {
    const hash = locationHash(exploration.locationMovingTo);

    exploration.computer.runUntilWaitingForInput();
    const computerOutput = numberToOutput[exploration.computer.output.pop()!];
    grid.set(hash, {
      value: computerOutput,
      location: exploration.locationMovingTo,
    });
    explorationList.delete(hash);
    if (computerOutput === '#') {
      continue;
    }

    const futureMoves = possibleExplorations(
      exploration.locationMovingTo,
      exploration.computer,
    );
    futureMoves.forEach(move => {
      const newHash = locationHash(move.locationMovingTo);
      if (!explorationList.has(newHash) && !grid.has(newHash)) {
        explorationList.set(newHash, move);
      }
    });
  }
  return grid;
};

const printGrid = (grid: string[][]): void => {
  console.log(
    grid
      .map(line =>
        line
          .join('')
          .replace(/\./g, ' ')
          .replace(/X/g, '.'),
      )
      .join('\n'),
  );
};

const findStart = (grid: string[][]): Coord => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'o') {
        return { x, y };
      }
    }
  }
  return { x: 0, y: 0 };
};

const findEnd = (grid: string[][]): Coord => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === '!') {
        return { x, y };
      }
    }
  }
  return { x: 0, y: 0 };
};

const gridToBinary2DArray = (grid: string[][]) => {
  return grid.map(line => line.map(square => (square === '#' ? 1 : 0)));
};

const gridTo2DArray = (grid: Grid): string[][] => {
  const { maxX, maxY, minX, minY } = Array.from(grid.values()).reduce(
    ({ maxX, maxY, minX, minY }: GridMeta, cur) => {
      maxX = Math.max(maxX, cur.location.x);
      minX = Math.min(minX, cur.location.x);
      maxY = Math.max(maxY, cur.location.y);
      minY = Math.min(minY, cur.location.y);
      return {
        maxX,
        maxY,
        minX,
        minY,
      };
    },
    { maxX: 0, minX: 0, maxY: 0, minY: 0 },
  );
  const width: number = maxX - minX + 1;
  const height: number = maxY - minY + 1;
  const offsetX: number = 0 - minX;
  const offsetY: number = 0 - minY;
  const outputGrid: string[][] = new Array(height)
    .fill([])
    .map(row => [...new Array(width).fill(' ')]);
  grid.forEach((value, key) => {
    const [x, y] = key.split(',').map(n => parseInt(n, 10));
    const offX = x + offsetX;
    const offY = y + offsetY;
    outputGrid[offY][offX] = value.value;
  });
  return outputGrid;
};

const addOxygen = (grid: Grid): Grid => {
  const output = new Map<string, Space>();
  grid.forEach((space, hash) => {
    if (!output.has(hash)) {
      output.set(hash, space);
    }
    if (space.value === '!' || space.value === 'O') {
      [
        { x: space.location.x, y: space.location.y - 1 },
        { x: space.location.x, y: space.location.y + 1 },
        { x: space.location.x + 1, y: space.location.y },
        { x: space.location.x - 1, y: space.location.y },
      ].forEach(location => {
        const neighbourHash = locationHash(location);
        const existing = grid.get(neighbourHash);
        if (existing && existing.value !== '#') {
          output.set(neighbourHash, { location, value: 'O' });
        }
      });
    }
  });
  return output;
};

const checkIfFilled = (grid: Grid): boolean => {
  const empty = Array.from(grid.values()).filter(
    s => s.value === '.' || s.value === 'o',
  );
  return empty.length === 0;
};

export class Puzzle201915 extends PuzzleDay {
  part1() {
    const intcode = parseInput(this.input);
    const computer = new IntCodeComputer({ state: intcode });
    computer.runUntilWaitingForInput();
    const grid = exploreGrid(computer);
    const stringGrid = gridTo2DArray(grid);
    const startLocation = findStart(stringGrid);
    const endLocation = findEnd(stringGrid);
    const astar: AStarFinder = new AStarFinder({
      grid: {
        matrix: gridToBinary2DArray(stringGrid),
      },
      diagonalAllowed: false,
    });
    const path = astar.findPath(startLocation, endLocation);
    path.forEach(step => {
      stringGrid[step[1]][step[0]] = 'X';
    });
    printGrid(stringGrid);
    return `${path.length - 1}`;
  }

  part2() {
    const intcode = parseInput(this.input);
    const computer = new IntCodeComputer({ state: intcode });
    computer.runUntilWaitingForInput();
    let grid = exploreGrid(computer);
    let filled = false;
    let count = 0;
    while (!filled) {
      grid = addOxygen(grid);
      filled = checkIfFilled(grid);
      count++;
    }
    return `${count}`;
  }
}
