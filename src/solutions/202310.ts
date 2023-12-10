import { number } from 'yargs';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Dir = 'N' | 'S' | 'E' | 'W';

type Coord = {
  i: number;
  j: number;
};

type State = {
  location: Coord;
  dir: Dir;
  pipe: Set<string>;
};

const pipeTranslation: Record<string, Record<string, [(input: Coord) => Coord, Dir]>> = {
  '|': {
    N: [({ i, j }: Coord) => ({ i: i + 1, j }), 'N'],
    S: [({ i, j }: Coord) => ({ i: i - 1, j }), 'S'],
  },
  '-': {
    E: [({ i, j }: Coord) => ({ i, j: j - 1 }), 'E'],
    W: [({ i, j }: Coord) => ({ i, j: j + 1 }), 'W'],
  },
  L: {
    N: [({ i, j }: Coord) => ({ i, j: j + 1 }), 'W'],
    E: [({ i, j }: Coord) => ({ i: i - 1, j }), 'S'],
  },
  J: {
    N: [({ i, j }: Coord) => ({ i, j: j - 1 }), 'E'],
    W: [({ i, j }: Coord) => ({ i: i - 1, j }), 'S'],
  },
  '7': {
    W: [({ i, j }: Coord) => ({ i: i + 1, j }), 'N'],
    S: [({ i, j }: Coord) => ({ i, j: j - 1 }), 'E'],
  },
  F: {
    E: [({ i, j }: Coord) => ({ i: i + 1, j }), 'N'],
    S: [({ i, j }: Coord) => ({ i, j: j + 1 }), 'W'],
  },
};

export const parseInput = (input: string): string[][] => {
  const lines = splitLines(input).map(l => l.split(''));
  return lines;
};

const findStart = (map: string[][]): Coord => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] === 'S') {
        return { i, j };
      }
    }
  }

  return { i: 0, j: 0 };
};

const findStartConnector = (map: string[][], start: Coord): State => {
  if (['|', '7', 'F'].includes(map[start.i - 1]?.[start.j] ?? '.')) {
    // Next is above
    return {
      location: { i: start.i - 1, j: start.j },
      dir: 'S',
      pipe: new Set<string>([`${start.i};${start.j}`]),
    };
  } else if (['-', 'J', '7'].includes(map[start.i]?.[start.j + 1])) {
    return {
      location: { i: start.i, j: start.j + 1 },
      dir: 'W',
      pipe: new Set<string>([`${start.i};${start.j}`]),
    };
  } else if (['|', 'L', 'J'].includes(map[start.i + 1]?.[start.j])) {
    return {
      location: { i: start.i + 1, j: start.j },
      dir: 'N',
      pipe: new Set<string>([`${start.i};${start.j}`]),
    };
  }

  return {
    location: { i: start.i, j: start.j - 1 },
    dir: 'E',
    pipe: new Set<string>([`${start.i};${start.j}`]),
  };
};

const followPipe = (map: string[][], start: Coord, initialState: State): Set<string> => {
  let currentState = { ...initialState };

  while (currentState.location.i !== start.i || currentState.location.j !== start.j) {
    currentState = nextState(map, currentState);
  }

  return currentState.pipe;
};

const nextState = (map: string[][], state: State): State => {
  const currentPipe = map[state.location.i][state.location.j];
  const [locationMapper, dir] = pipeTranslation[currentPipe][state.dir];

  return {
    pipe: state.pipe.add(`${state.location.i};${state.location.j}`),
    location: locationMapper(state.location),
    dir,
  };
};

const isLoop = (pos: Coord, loop: Set<string>) => loop.has(`${pos.i};${pos.j}`);

const countInterior = (map: string[][], loop: Set<string>): number => {
  const counts = map.map(
    (row, i) =>
      row.reduce<{ count: number; crosses: number; corner: string | undefined }>(
        (carry, cell, j) => {
          let { count, crosses, corner } = carry;

          if (isLoop({ i, j }, loop)) {
            if (cell === '|') {
              crosses++;
            } else if (cell !== '-') {
              if (corner) {
                if (corner === 'L' && cell === '7') {
                  crosses++;
                } else if (corner === 'F' && cell === 'J') {
                  crosses++;
                }

                corner = undefined;
              } else {
                corner = cell;
              }
            }
          } else if (crosses % 2 === 1) {
            count++;
          }

          return { count, corner, crosses };
        },
        { count: 0, corner: undefined, crosses: 0 },
      ).count,
  );

  return counts.reduce((sum, curr) => sum + curr, 0);
};

export class Puzzle202310 extends PuzzleDay {
  part1() {
    const map = parseInput(this.input);
    const start = findStart(map);
    const initialState = findStartConnector(map, start);
    const pipe = followPipe(map, start, initialState);
    return `${Math.ceil(pipe.size / 2)}`;
  }

  part2() {
    const map = parseInput(this.input);
    const start = findStart(map);
    const initialState = findStartConnector(map, start);
    const pipe = followPipe(map, start, initialState);
    const inside = countInterior(map, pipe);
    return `${inside}`;
  }
}
