import { PuzzleDay } from './puzzleDay';
import { IntCodeComputer } from './opCodes2019';

type Coord = {
  x: number;
  y: number;
};

type RobotCoord = Coord & {
  facing: Facing;
};

type Move = number | 'L' | 'R';

type Facing = '^' | 'v' | '<' | '>';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

const outputToGrid = (output: number[]): string[][] => {
  const gridString = output.map(num => String.fromCharCode(num)).join('');
  return gridString.split('\n').map(line => line.split(''));
  // return gridString;
};

const findIntersections = (grid: string[][]): Coord[] => {
  const intersections: Coord[] = [];
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (grid[i][j] === '#') {
        if (
          grid[i - 1][j] === '#' &&
          grid[i + 1][j] === '#' &&
          grid[i][j - 1] === '#' &&
          grid[i][j + 1] === '#'
        ) {
          intersections.push({ x: j, y: i });
        }
      }
    }
  }
  return intersections;
};

const calculateAlignmentParams = (intersections: Coord[]): number => {
  return intersections.reduce(
    (sum: number, curr: Coord) => sum + curr.x * curr.y,
    0,
  );
};

const findRobot = (grid: string[][]): RobotCoord => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (
        grid[i][j] === '^' ||
        grid[i][j] === '<' ||
        grid[i][j] === '>' ||
        grid[i][j] === 'v'
      ) {
        return { x: j, y: i, facing: grid[i][j] as Facing };
      }
    }
  }
  return { x: 0, y: 0, facing: '^' };
};

const neighbours = (coord: Coord): { [K in Facing]: Coord } => {
  return {
    '^': { x: coord.x, y: coord.y - 1 },
    '<': { x: coord.x - 1, y: coord.y },
    '>': { x: coord.x + 1, y: coord.y },
    v: { x: coord.x, y: coord.y + 1 },
  };
};

const chooseMove = (grid: string[][], coord: RobotCoord) => {
  const possibleMoves = neighbours(coord);
  const moveKeys: Facing[] = Object.keys(possibleMoves) as Facing[];
  const validDirs: RobotCoord[] = moveKeys
    .map(moveDirection => {
      const moveCoord = possibleMoves[moveDirection];
      return {
        facing: moveDirection,
        x: moveCoord.x,
        y: moveCoord.y,
      };
    })
    .filter(move => {
      if (
        move.x < 0 ||
        move.y < 0 ||
        move.x >= grid[0].length ||
        move.y >= grid.length
      ) {
        return false;
      }
      if (
        (move.facing === '^' && coord.facing === 'v') ||
        (move.facing === '<' && coord.facing === '>') ||
        (move.facing === '>' && coord.facing === '<') ||
        (move.facing === 'v' && coord.facing === '^')
      ) {
        return false;
      }
      if (grid[move.y][move.x] !== '#') {
        return false;
      }
      return true;
    });
  const moveForward = validDirs.find(move => move.facing === coord.facing);

  if (moveForward) {
    return moveForward;
  }
  return validDirs.shift();
};

const calcTurn = (facing: Facing, desiredFacing: Facing): Move => {
  switch (facing) {
    case '^':
      return desiredFacing === '<' ? 'L' : 'R';
    case '<':
      return desiredFacing === 'v' ? 'L' : 'R';
    case 'v':
      return desiredFacing === '>' ? 'L' : 'R';
    case '>':
      return desiredFacing === '^' ? 'L' : 'R';
  }
};

const calculateRoute = (grid: string[][]): Move[] => {
  let robotLocation = findRobot(grid);
  const moves: Move[] = [];
  let nextMove = chooseMove(grid, robotLocation);
  let run = 0;
  while (nextMove) {
    if (nextMove.facing === robotLocation.facing) {
      run++;
      robotLocation = nextMove;
    } else {
      const turn = calcTurn(robotLocation.facing, nextMove.facing);
      moves.push(run);
      moves.push(turn);
      run = 1;
      robotLocation = nextMove;
    }
    nextMove = chooseMove(grid, robotLocation);
  }
  moves.push(run);

  return moves.filter(move => move !== 0);
};

const movesToAscii = (moves: Move[]): string[] => {
  return moves
    .join(',')
    .split('')
    .map(char => char.charCodeAt(0).toString());
};

const compress = (str: string) => {
  for (let a = 1; a <= 20; a++) {
    for (let b = 1; b <= 20; b++) {
      for (let c = 1; c <= 20; c++) {
        const matches = new Map<string, string>();
        let remaining = str;
        matches.set('A', remaining.slice(0, a));
        remaining = remaining.replace(
          new RegExp(matches.get('A') + ',?', 'gu'),
          '',
        );
        matches.set('B', remaining.slice(0, b));
        remaining = remaining.replace(
          new RegExp(matches.get('B') + ',?', 'gu'),
          '',
        );
        matches.set('C', remaining.slice(0, c));
        remaining = remaining.replace(
          new RegExp(matches.get('C') + ',?', 'gu'),
          '',
        );
        if (!remaining) {
          let compressed = str;
          Array.from(matches.entries()).forEach(
            ([key, value]) =>
              (compressed = compressed.replace(new RegExp(value, 'gu'), key)),
          );
          return { compressed, matches };
        }
      }
    }
  }
};

export class Puzzle201917 extends PuzzleDay {
  part1() {
    const intCode = parseInput(this.input);
    const computer = new IntCodeComputer({ state: intCode });
    computer.runUntilWaitingForInput();
    const grid = outputToGrid(computer.output.slice(0, -2));
    const intersections = findIntersections(grid);
    return `${calculateAlignmentParams(intersections)}`;
  }

  part2() {
    const intCode = parseInput(this.input);
    const computer = new IntCodeComputer({ state: intCode });
    computer.runUntilWaitingForInput();
    const grid = outputToGrid(computer.output.slice(0, -2));
    const moves = calculateRoute(grid);
    const compressed = compress(moves.join(','));
    const input =
      [
        compressed?.compressed,
        compressed?.matches.get('A'),
        compressed?.matches.get('B'),
        compressed?.matches.get('C'),
      ].join('\n') +
      '\n' +
      'n' +
      '\n';
    const ascii = input.split('').map(c => c.charCodeAt(0));

    const newState = [...intCode];
    newState[0] = 2;
    const newComputer = new IntCodeComputer({ state: newState, input: ascii });
    newComputer.runUntilWaitingForInput();
    const dust = newComputer.output.pop();
    return `${dust}`;
  }
}
