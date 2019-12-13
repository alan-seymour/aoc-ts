import { PuzzleDay } from './puzzleDay';
import { IntCodeComputer } from './opCodes2019';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export class Puzzle201905 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const computer = new IntCodeComputer({ state: input, input: [1] });
    computer.runUntilWaitingForInput();
    return `${computer.output.pop()}`;
  }

  part2() {
    const input = parseInput(this.input);
    const computer = new IntCodeComputer({ state: input, input: [5] });
    computer.runUntilWaitingForInput();
    return `${computer.output.pop()}`;
  }
}
