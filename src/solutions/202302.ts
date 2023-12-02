import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Draw = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  draws: Draw[];
};

export const parseInput = (input: string): Game[] => {
  const lines = splitLines(input);
  return lines.map(line => {
    const [gameString, drawsString] = line.split(':');
    const id = Number(gameString.split(' ')[1]);
    const stringDraws = drawsString.split(';');
    const draws = stringDraws.map(s => parseDraw(s));
    return {
      id,
      draws,
    };
  });
};

const parseDraw = (drawString: string): Draw => {
  const red = Number(drawString.match(/(\d+) red/)?.[1] ?? 0);
  const green = Number(drawString.match(/(\d+) green/)?.[1] ?? 0);
  const blue = Number(drawString.match(/(\d+) blue/)?.[1] ?? 0);

  return {
    red,
    green,
    blue,
  };
};

const part1Filter = (game: Game): boolean =>
  game.draws.every(draw => draw.red <= 12 && draw.green <= 13 && draw.blue <= 14);

const minimumCubes = (game: Game): Draw =>
  game.draws.reduce(
    (max, curr) => ({
      red: Math.max(max.red, curr.red),
      green: Math.max(max.green, curr.green),
      blue: Math.max(max.blue, curr.blue),
    }),
    { red: 0, green: 0, blue: 0 },
  );

const power = (draw: Draw): number => draw.red * draw.blue * draw.green;

export class Puzzle202302 extends PuzzleDay {
  part1() {
    const games = parseInput(this.input);
    const valid = games.filter(part1Filter);
    const idSum = valid.reduce((sum, game) => sum + game.id, 0);
    return `${idSum}`;
  }

  part2() {
    const games = parseInput(this.input);
    const minCubes = games.map(minimumCubes);
    const powers = minCubes.map(power);
    const sum = powers.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }
}
