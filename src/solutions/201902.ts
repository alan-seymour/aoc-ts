import { PuzzleDay } from '../puzzleDay';
import { IntCodeComputer } from '../helpers';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export const runWithNounVerb = (
  state: number[],
  noun: number,
  verb: number,
): IntCodeComputer => {
  const runState = [...state];
  runState[1] = noun;
  runState[2] = verb;
  const computer = new IntCodeComputer({ state: runState });
  computer.runUntilWaitingForInput();
  return computer;
};

export class Puzzle201902 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const result = runWithNounVerb(input, 12, 2);
    return `${result.state[0]}`;
  }

  part2() {
    const initialState = parseInput(this.input);
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const result = runWithNounVerb(initialState, noun, verb);
        if (result.state[0] === 19690720) {
          return `${100 * noun + verb}`;
        }
      }
    }
    return 'ERROR, No Solution Found';
  }
}
