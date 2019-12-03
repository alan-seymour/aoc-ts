import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export type SystemState = {
  state: number[];
  index: number;
  halted: boolean;
};

export const runOpcode = ({
  state,
  index,
  halted
}: SystemState): SystemState => {
  switch (state[index]) {
    case 1:
      state[state[index + 3]] =
        state[state[index + 2]] + state[state[index + 1]];
      return {
        state: [...state],
        index: index + 4,
        halted: false
      };
      break;
    case 2:
      state[state[index + 3]] =
        state[state[index + 2]] * state[state[index + 1]];
      return {
        state: [...state],
        index: index + 4,
        halted: false
      };
      break;
    case 99:
      return {
        state: [...state],
        index: index + 1,
        halted: true
      };
      break;
    default:
      return {
        state: [...state],
        index,
        halted
      };
  }
};

export const runToCompletetion = (
  noun: number,
  verb: number,
  initialState: number[]
): number[] => {
  let state: SystemState = {
    state: [...initialState],
    index: 0,
    halted: false
  };
  state.state[1] = noun;
  state.state[2] = verb;
  while (!state.halted) {
    state = runOpcode(state);
  }
  return state.state;
};

export class Puzzle201902 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const state = runToCompletetion(12, 2, input);
    return `${state[0]}`;
  }

  part2() {
    const initialState = parseInput(this.input);
    for (let noun = 0; noun < 100; noun++) {
      for (let verb = 0; verb < 100; verb++) {
        const result = runToCompletetion(noun, verb, initialState);
        if (result[0] === 19690720) {
          return `${100 * noun + verb}`;
        }
      }
    }
    return 'ERROR, No Solution Found';
  }
}
