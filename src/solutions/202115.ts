import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';
import PriorityQueue from 'ts-priority-queue';

type Coord = {
  x: number;
  y: number;
};

type QueueItem = {
  pos: Coord;
  cost: number;
};

export const parseInput = (input: string): number[][] => {
  const grid = splitLines(input).map((l) =>
    l.split('').map((d) => parseInt(d, 10))
  );
  return grid;
};

const getNeighbours = ({ x, y }: Coord): Coord[] => [
  { x: x - 1, y },
  { x: x + 1, y },
  { x, y: y - 1 },
  { x, y: y + 1 },
];

const getLocationCost = (
  grid: number[][],
  { x, y }: Coord,
  tile: boolean
): number | null => {
  if (!tile) {
    return grid[x]?.[y] ?? null;
  }
  if (x < 0 || y < 0 || x >= 5 * grid.length || y >= 5 * grid.length) {
    return null;
  }

  const value = grid[x % grid.length]?.[y % grid.length] ?? 0;
  const scaled =
    value + Math.floor(y / grid.length) + Math.floor(x / grid.length);
  return (scaled % 10) + Math.floor(scaled / 10);
};

const calculateShortestLength = (
  grid: number[][],
  start: Coord,
  end: Coord,
  tile: boolean
): number => {
  const queue = new PriorityQueue<QueueItem>({
    comparator: (a, b) => a.cost - b.cost,
  });
  let current: QueueItem = { pos: start, cost: 0 };
  const costs = new Map<string, number>();

  while (current.pos.x !== end.x || current.pos.y !== end.y) {
    const key = `${current.pos.x},${current.pos.y}`;

    if (costs.has(key)) {
      current = queue.dequeue();
      continue;
    }

    costs.set(key, current.cost);

    getNeighbours(current.pos).forEach((c) => {
      const cCost = getLocationCost(grid, c, tile);
      if (cCost) {
        queue.queue({ pos: c, cost: current.cost + cCost });
      }
    });

    current = queue.dequeue();
  }

  return current.cost;
};

export class Puzzle202115 extends PuzzleDay {
  part1() {
    const grid = parseInput(this.input);
    const shortestLength = calculateShortestLength(
      grid,
      { x: 0, y: 0 },
      { x: grid.length - 1, y: grid[0].length - 1 },
      false
    );
    return `${shortestLength}`;
  }

  part2() {
    const grid = parseInput(this.input);
    const shortestLength = calculateShortestLength(
      grid,
      { x: 0, y: 0 },
      { x: grid.length * 5 - 1, y: grid[0].length * 5 - 1 },
      true
    );
    return `${shortestLength}`;
  }
}
