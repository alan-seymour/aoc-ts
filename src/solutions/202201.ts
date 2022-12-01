import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  const lines = splitLines(input).reduce<number[]>(
    (elves, current) => {
      if (current === '') {
        elves.push(0);
      } else {
        elves[elves.length - 1] += parseInt(current, 10);
      }

      return elves;
    },
    [0],
  );

  return lines;
};

export class Puzzle202201 extends PuzzleDay {
  part1() {
    const elves = parseInput(this.input);
    elves.sort((a, b) => b - a);
    return `${elves[0]}`;
  }

  part2() {
    const elves = parseInput(this.input);
    elves.sort((a, b) => b - a);
    return `${elves[0] + elves[1] + elves[2]}`;
  }
}
