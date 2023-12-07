import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Race = {
  time: number;
  distance: number;
};

export const parseInput = (input: string): Race[] => {
  const lines = splitLines(input);
  const timeString = lines[0];
  const distanceString = lines[1];

  const times = timeString
    .split(':')[1]
    .split(' ')
    .filter(Boolean)
    .map(t => Number(t));

  const distances = distanceString
    .split(':')[1]
    .split(' ')
    .filter(Boolean)
    .map(t => Number(t));

  return times.map((t, i) => ({ time: t, distance: distances[i] }));
};

const solveQuadratic = (a: number, b: number, c: number): [number, number] => {
  const plus = (b * -1 + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
  const minus = (b * -1 - Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);

  return [minus, plus];
};

const findRange = (time: number, distance: number): number => {
  const [lower, higher] = solveQuadratic(1, -1 * time, distance + 0.000001);

  return Math.ceil(higher) - Math.ceil(lower);
};

export class Puzzle202306 extends PuzzleDay {
  part1() {
    const races = parseInput(this.input);
    const ranges = races.map(({ time, distance }) => findRange(time, distance));

    const multiple = ranges.reduce((mult, curr) => mult * curr, 1);
    return `${multiple}`;
  }

  part2() {
    const races = parseInput(this.input);
    const time = Number(races.reduce((t, curr) => `${t}${curr.time}`, ''));
    const distance = Number(races.reduce((d, curr) => `${d}${curr.distance}`, ''));
    const range = findRange(time, distance);
    return `${range}`;
  }
}
