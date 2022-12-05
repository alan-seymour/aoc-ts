import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[][] => {
  const lines = splitLines(input).map(line => line.split(/[-,]/).map(n => parseInt(n)));
  return lines;
};

const fullyContains = (ranges: number[]): boolean =>
  (ranges[0] <= ranges[2] && ranges[1] >= ranges[3]) ||
  (ranges[2] <= ranges[0] && ranges[3] >= ranges[1]);

const overlaps = (ranges: number[]): boolean =>
  (ranges[0] <= ranges[2] && ranges[1] >= ranges[2]) ||
  (ranges[0] <= ranges[3] && ranges[1] >= ranges[3]) ||
  (ranges[2] <= ranges[0] && ranges[3] >= ranges[1]);

export class Puzzle202204 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const fullyContained = lines.filter(fullyContains);
    return `${fullyContained.length}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const overlapped = lines.filter(overlaps);
    return `${overlapped.length}`;
  }
}
