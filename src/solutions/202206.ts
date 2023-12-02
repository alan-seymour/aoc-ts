import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const stream = input.trim().split('');
  return stream;
};

const findStartMarker = (stream: string[], length: number): number => {
  for (let i = 3; i < stream.length; i++) {
    const set = new Set(stream.slice(i - length, i));

    if (set.size === length) {
      return i;
    }
  }

  return 0;
};

export class Puzzle202206 extends PuzzleDay {
  part1() {
    const stream = parseInput(this.input);
    const starting = findStartMarker(stream, 4);
    return `${starting}`;
  }

  part2() {
    const stream = parseInput(this.input);
    const starting = findStartMarker(stream, 14);
    return `${starting}`;
  }
}
