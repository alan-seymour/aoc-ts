import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

export const parseInput = (input: string) => {
  const lines = splitLines(input);
  const numbers = lines.map(line => parseInt(line, 10));
  return numbers;
};

export class Puzzle201801 extends PuzzleDay {
  part1() {
    const numbers = parseInput(this.input);
    return '' + numbers.reduce((p, c) => p + c, 0);
  }

  part2() {
    const numbers = parseInput(this.input);
    const seen: Set<number> = new Set([]);
    let runningTotal = 0;
    let index = 0;
    while (!seen.has(runningTotal)) {
      seen.add(runningTotal);
      runningTotal += numbers[index % numbers.length];
      index += 1;
    }
    return '' + runningTotal;
  }
}
