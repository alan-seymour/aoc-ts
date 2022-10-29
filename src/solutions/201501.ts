import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const line = input.trim();
  const chars = line.split('');
  return chars;
};

const calcTotal = (chars: string[]): number =>
  chars.reduce((c, i) => (i === '(' ? c + 1 : c - 1), 0);

const runUntilTarget = (chars: string[], target: number): number => {
  let i = 0;
  let floor = 0;

  while (floor !== target) {
    floor = chars[i] === '(' ? floor + 1 : floor - 1;
    i++;
  }

  return i;
};

export class Puzzle201501 extends PuzzleDay {
  part1() {
    const chars = parseInput(this.input);
    const total = calcTotal(chars);
    return `${total}`;
  }

  part2() {
    const chars = parseInput(this.input);
    const firstBasement = runUntilTarget(chars, -1);
    return `${firstBasement}`;
  }
}
