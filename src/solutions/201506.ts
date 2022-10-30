import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Coord = { x: number; y: number };

type Action = 'toggle' | 'turn on' | 'turn off';

type Range = {
  start: Coord;
  end: Coord;
};

type Command = {
  action: Action;
  range: Range;
};

type Light = number;

type Grid = Light[][];

const isAction = (act: string): act is Action =>
  act === 'turn on' || act === 'turn off' || act === 'toggle';

export const parseInput = (input: string): Command[] => {
  const lines = splitLines(input)
    .map(line => {
      const [, c, sx, sy, ex, ey] =
        line.match(/(\D*)(\d+),(\d+) through (\d+),(\d+)/)?.map(x => x.trim()) ?? [];

      if (isAction(c)) {
        const command: Command = {
          action: c,
          range: {
            start: {
              x: parseInt(sx, 10),
              y: parseInt(sy, 10),
            },
            end: {
              x: parseInt(ex, 10),
              y: parseInt(ey, 10),
            },
          },
        };

        return command;
      }

      return null;
    })
    .filter((c): c is Command => c !== null);

  return lines;
};

const runCommandPart1 = (grid: Grid, command: Command): Grid => {
  for (let i = command.range.start.x; i <= command.range.end.x; i++) {
    for (let j = command.range.start.y; j <= command.range.end.y; j++) {
      const current = grid[j][i];

      const updated: Light =
        command.action === 'turn off'
          ? 0
          : command.action === 'turn on'
          ? 1
          : current === 0
          ? 1
          : 0;

      grid[j][i] = updated;
    }
  }

  return grid;
};

const countOn = (grid: Grid): number =>
  grid.reduce((on, row) => on + row.filter(l => l === 1).length, 0);

const runCommandPart2 = (grid: Grid, command: Command): Grid => {
  for (let i = command.range.start.x; i <= command.range.end.x; i++) {
    for (let j = command.range.start.y; j <= command.range.end.y; j++) {
      const current = grid[j][i];

      const updated: Light =
        command.action === 'turn off'
          ? current - 1
          : command.action === 'turn on'
          ? current + 1
          : current + 2;

      grid[j][i] = Math.max(updated, 0);
    }
  }

  return grid;
};

const sumTotal = (grid: Grid): number =>
  grid.reduce((brightness, row) => brightness + row.reduce((b, l) => b + l, 0), 0);

export class Puzzle201506 extends PuzzleDay {
  part1() {
    const commands = parseInput(this.input);
    const grid: Grid = Array.from(Array(1000), _ => Array(1000).fill(0));
    const finalGrid = commands.reduce((prev, command) => runCommandPart1(prev, command), grid);
    return `${countOn(finalGrid)}`;
  }

  part2() {
    const commands = parseInput(this.input);
    const grid: Grid = Array.from(Array(1000), _ => Array(1000).fill(0));
    const finalGrid = commands.reduce((prev, command) => runCommandPart2(prev, command), grid);
    return `${sumTotal(finalGrid)}`;
  }
}
