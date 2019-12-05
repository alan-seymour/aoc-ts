import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';
import { runToCompletetion, SystemState } from './opCodes2019';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export class Puzzle201905 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const state = runToCompletetion(input, [1]);
    return `${state.output.pop()}`;
  }

  part2() {
    const input = parseInput(this.input);
    const state = runToCompletetion(input, [5]);
    return `${state.output.pop()}`;
  }
}
