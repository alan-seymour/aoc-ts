import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const lines = splitLines(input);
  return lines;
};

const evaluateString = (input: string): string =>
  input
    .slice(1, -1)
    .replaceAll('\\\\', '\\')
    .replaceAll('\\"', '"')
    .replaceAll(/\\x[0-9a-f]{2}/g, '!');

const encodeString = (input: string): string =>
  `"${input.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;

export class Puzzle201508 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);

    const total = lines.reduce((c, line) => line.length - evaluateString(line).length + c, 0);

    return `${total}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const total = lines.reduce((c, line) => encodeString(line).length - line.length + c, 0);
    return `${total}`;
  }
}
