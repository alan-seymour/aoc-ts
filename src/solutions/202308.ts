import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Input = {
  moves: string[];
  map: Record<string, Record<string, string>>;
};

export const parseInput = (input: string): Input => {
  const lines = splitLines(input);
  const moves = lines.shift()?.split('') ?? [];
  lines.shift();
  const map: Record<string, Record<string, string>> = {};

  lines.forEach(l => {
    const [input, out] = l.split(' = ');
    const [L, R] = out.split(', ');

    map[input] = {
      L: L.slice(1),
      R: R.slice(0, -1),
    };
  });

  return {
    moves,
    map,
  };
};

const followMap = (
  input: Input,
  startPoint: string,
  isEnd: (location: string) => boolean,
): number => {
  let i = 0;
  let location = startPoint;

  while (!isEnd(location)) {
    location = input.map[location][input.moves[i % input.moves.length]];
    i++;
  }

  return i;
};

const gcd2 = (a: number, b: number): number => {
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
};

const lcm2 = (a: number, b: number): number => (a * b) / gcd2(a, b);

const lcm = (numbers: number[]): number => {
  let n = 1;
  for (let i = 0; i < numbers.length; ++i) n = lcm2(numbers[i], n);
  return n;
};

const followEachMap = (input: Input): number => {
  const starts = Object.keys(input.map).filter(l => l.slice(-1) === 'A');
  const steps = starts.map(s => followMap(input, s, location => location.slice(-1) === 'Z'));

  return lcm(steps);
};

export class Puzzle202308 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const steps = followMap(input, 'AAA', location => location === 'ZZZ');
    return `${steps}`;
  }

  part2() {
    const input = parseInput(this.input);
    const steps = followEachMap(input);
    return `${steps}`;
  }
}
