import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Position = {
  x: number;
  y: number;
}

type GuardState = Position & {
  dir: 'U' | 'D' | 'L' | 'R';
}

export const parseInput = (input: string): string[][] => {
  const grid = splitLines(input).map((line) => line.split(''));
  return grid;
};

const turn = (guard: GuardState): GuardState => {
  switch (guard.dir) {
    case 'U': return { ...guard, dir: 'R' };
    case 'R': return { ...guard, dir: 'D' };
    case 'D': return { ...guard, dir: 'L' };
    case 'L': return { ...guard, dir: 'U' };
  }
}

const nextSpot = ({x, y, dir}: GuardState): {x: number, y: number} => {
  switch (dir) {
    case 'U': return { x, y: y - 1 };
    case 'R': return { x: x + 1, y };
    case 'D': return { x, y: y + 1 };
    case 'L': return { x: x - 1, y };
  }
}

const timeStep = ({x, y, dir}: GuardState, grid: string[][]): GuardState => {
  const { x: nextX, y: nextY } = nextSpot({x, y, dir});
  if ((grid[nextY]?.[nextX] ?? '' ) === '#') {
    return turn({x, y, dir});
  }
  return { x: nextX, y: nextY, dir };
}

const isInBounds = ({x, y}: GuardState, grid: string[][]): boolean => {
  return x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;
}

const hashGuardState = ({x, y, dir}: GuardState): string => `${x},${y},${dir}`;
const hashPosition = ({x, y}: Position): string => `${x},${y}`;

const stepUntilEnd = (initialState: GuardState, grid: string[][]): {previousStates: Map<string, GuardState>, outOfBounds: boolean} => {
  let state = initialState;
  let previousState = new Map<string, GuardState>();
  let stateHash = hashGuardState(state);

  while (isInBounds(state, grid) && !previousState.has(stateHash)) {
    previousState.set(stateHash, state);
    state = timeStep(state, grid);
    stateHash = hashGuardState(state);
  }

  return { previousStates: previousState, outOfBounds: !isInBounds(state, grid) };
}

const getInitialState = (grid: string[][]): GuardState => {
  const y = grid.findIndex((line) => line.includes('^'));
  const x = grid[y].indexOf('^');
  return { x, y, dir: 'U' };
}

const countUniquePositions = (previousStates: Map<string, GuardState>): number => {
  const seen = new Set<string>();

  for (const state of previousStates.values()) {
    seen.add(hashPosition(state));
  }

  return seen.size;
}

const cloneGrid = (grid: string[][]): string[][] => {
  return grid.map((line) => [...line]);
};

const runWithNewObstacles = (initialState: GuardState, grid: string[][], obstacles: Position[]): number => {
  let state = initialState;
  let validObstacles = new Set<string>();

  obstacles.forEach((pos) => {
    const cloned = cloneGrid(grid);
    cloned[pos.y][pos.x] = '#';
    const { outOfBounds } = stepUntilEnd(state, cloned);
    if (!outOfBounds) {
      validObstacles.add(hashPosition(pos));
    }
  });

  return validObstacles.size;
}

const generatePossibleObstaclePositions = (initialState: GuardState, grid: string[][]): Position[] => {
  const initialPositionHash = hashPosition(initialState);
  const { previousStates } = stepUntilEnd(initialState, grid);
  const possibleObstacles: Position[] = [];
  const seenObs = new Set<string>();

  for (const state of previousStates.values()) {
    const hash = hashPosition(state);
    if (!seenObs.has(hash) && hash !== initialPositionHash) {
      seenObs.add(hash);
      possibleObstacles.push({ x: state.x, y: state.y });
    }
  }

  return possibleObstacles;
}

export class Puzzle202406 extends PuzzleDay {
  part1() {
    const grid = parseInput(this.input);
    const initialState = getInitialState(grid);
    const { previousStates } = stepUntilEnd(initialState, grid);
    const positionCount = countUniquePositions(previousStates);
    return `${positionCount}`;
  }

  part2() {
    const grid = parseInput(this.input);
    const initialState = getInitialState(grid);
    const possibleObstacles = generatePossibleObstaclePositions(initialState, grid);
    const obstacleCount = runWithNewObstacles(initialState, grid, possibleObstacles);
    return `${obstacleCount}`;
  }
}
