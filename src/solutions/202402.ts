import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[][] => {
  const lines = splitLines(input);
  return lines.map(line => line.split(' ').map(Number));
};

const isSafe = (report: number[]): boolean => {
  const increasing = report[0] < report[1];

  for (let i = 1; i < report.length; i++) {
    if (report[i] < report[i - 1] && increasing) {
      return false;
    }

    if (report[i] > report[i - 1] && !increasing) {
      return false;
    }

    const diff = Math.abs(report[i] - report[i - 1]);

    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
};

const isSafeDamped = (report: number[]): boolean =>
  isSafe(report) || report.some((_, i) => isSafe(report.slice(0, i).concat(report.slice(i + 1))));

export class Puzzle202402 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const safe = lines.filter(isSafe);
    return `${safe.length}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const safe = lines.filter(isSafeDamped);
    return `${safe.length}`;
  }
}
