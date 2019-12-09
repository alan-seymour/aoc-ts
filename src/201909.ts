import { permutator } from './helpers';
import { PuzzleDay } from './puzzleDay';
import { runToCompletetion, SystemState } from './opCodes2019';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export class Puzzle201909 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const result = runToCompletetion(input, [1]);
    return `${result.output[0]}`;
  }

  part2() {
    const input = parseInput(this.input);
    const result = runToCompletetion(input, [2]);
    return `${result.output[0]}`;
  }
}
