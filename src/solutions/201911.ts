import { IntCodeComputer } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

type Direction = 'U' | 'D' | 'L' | 'R';

type Turn = 'L' | 'R';

type GridColors = Map<string, number>;

type Location = {
  x: number;
  y: number;
};

const turnMappings: {
  [K in Turn]: {
    [K in Direction]: Direction;
  };
} = {
  L: {
    U: 'L',
    D: 'R',
    L: 'D',
    R: 'U',
  },
  R: {
    U: 'R',
    D: 'L',
    L: 'U',
    R: 'D',
  },
};

const moveMappings: { [K in Direction]: ({ x, y }: Location) => Location } = {
  U: ({ x, y }) => ({ x, y: y - 1 }),
  D: ({ x, y }) => ({ x, y: y + 1 }),
  L: ({ x, y }) => ({ x: x - 1, y }),
  R: ({ x, y }) => ({ x: x + 1, y }),
};

const numberToTurn = (number?: number): Turn => (number && number === 1 ? 'R' : 'L');

export class Robot {
  location: Location;
  facing: Direction;

  constructor() {
    this.location = {
      x: 0,
      y: 0,
    };

    this.facing = 'U';
  }

  turn(direction: Turn) {
    this.facing = turnMappings[direction][this.facing];
  }

  move() {
    this.location = moveMappings[this.facing](this.location);
  }
}

export class Stats {
  maxX: number;
  maxY: number;
  minX: number;
  minY: number;
  uniquePainted: Set<string>;

  constructor() {
    this.minX = Number.MAX_SAFE_INTEGER;
    this.minY = Number.MAX_SAFE_INTEGER;
    this.maxX = Number.MIN_SAFE_INTEGER;
    this.maxY = Number.MIN_SAFE_INTEGER;
    this.uniquePainted = new Set<string>();
  }

  update({ x, y }: Location, painted: boolean) {
    this.minX = Math.min(this.minX, x);
    this.maxX = Math.max(this.maxX, x);
    this.minY = Math.min(this.minY, y);
    this.maxY = Math.max(this.maxY, y);

    if (painted) {
      this.uniquePainted.add(`${x},${y}`);
    }
  }
}

export class Grid {
  robot: Robot;
  colours: GridColors;

  stats: Stats;

  constructor() {
    this.robot = new Robot();
    this.colours = new Map<string, number>();
    this.stats = new Stats();
  }

  getCurrentColor() {
    return this.getColor(this.robot.location);
  }

  setCurrentColor(color: number) {
    this.setColor(this.robot.location, color);
  }

  getColor({ x, y }: Location): number {
    const color = this.colours.get(`${x},${y}`);
    return color ? color : 0;
  }

  setColor({ x, y }: Location, colour: number): void {
    this.colours.set(`${x},${y}`, colour);
    this.stats.update({ x, y }, true);
  }

  turnAndMoveRobot(turn: Turn) {
    this.robot.turn(turn);
    this.robot.move();
    this.stats.update(this.robot.location, false);
  }

  toString() {
    const width: number = this.stats.maxX - this.stats.minX + 1;
    const height: number = this.stats.maxY - this.stats.minY + 1;
    const offsetX: number = 0 - this.stats.minX;
    const offsetY: number = 0 - this.stats.minY;

    const outputGrid: string[][] = new Array(height)
      .fill([])
      .map(row => [...new Array(width).fill(' ')]);

    this.colours.forEach((value, key) => {
      const [x, y] = key.split(',').map(n => parseInt(n, 10));
      const offX = x + offsetX;
      const offY = y + offsetY;
      outputGrid[offY][offX] = value === 1 ? '#' : ' ';
    });

    return outputGrid.map(line => line.join('')).join('\n');
  }
}

const handleOutput = (grid: Grid, output: number[]) => {
  output.forEach((v, i) => {
    if (i % 2 === 0) {
      grid.setCurrentColor(v);
    } else {
      grid.turnAndMoveRobot(numberToTurn(v));
    }
  });
};

const runMachine = (input: number[], grid: Grid) => {
  const computer = new IntCodeComputer({ state: input });

  while (!computer.halted) {
    computer.runUntilWaitingForInput();

    if (computer.halted) {
      break;
    }

    handleOutput(grid, computer.output);
    computer.output = [];
    computer.input.push(grid.getCurrentColor());
  }
};

export class Puzzle201911 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const grid = new Grid();
    runMachine(input, grid);
    return `${grid.stats.uniquePainted.size}`;
  }

  part2() {
    const input = parseInput(this.input);
    const grid = new Grid();
    grid.setCurrentColor(1);
    runMachine(input, grid);
    return grid.toString();
  }
}
