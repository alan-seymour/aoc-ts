import { permutator } from './helpers';
import { PuzzleDay } from './puzzleDay';
import {
  runToCompletetion,
  SystemState,
  runUntilOutputOrHalt,
} from './opCodes2019';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export const runAplifiersWithPhases = (
  state: number[],
  phases: number[],
): number => {
  const outputA = runToCompletetion(state, [phases.shift()!, 0]).output;
  const outputB = runToCompletetion(state, [phases.shift()!, outputA[0]])
    .output;
  const outputC = runToCompletetion(state, [phases.shift()!, outputB[0]])
    .output;
  const outputD = runToCompletetion(state, [phases.shift()!, outputC[0]])
    .output;
  const outputE = runToCompletetion(state, [phases.shift()!, outputD[0]])
    .output;

  return outputE[0];
};

export const runAmplifierLoop = (
  initialState: number[],
  phases: number[],
): number => {
  let amplifierAState: SystemState = {
    state: [...initialState],
    index: 0,
    halted: false,
    output: [],
    input: [phases[0], 0],
    relativeBase: 0,
  };
  let amplifierBState: SystemState = {
    state: [...initialState],
    index: 0,
    halted: false,
    output: [],
    input: [phases[1]],
    relativeBase: 0,
  };
  let amplifierCState: SystemState = {
    state: [...initialState],
    index: 0,
    halted: false,
    output: [],
    input: [phases[2]],
    relativeBase: 0,
  };
  let amplifierDState: SystemState = {
    state: [...initialState],
    index: 0,
    halted: false,
    output: [],
    input: [phases[3]],
    relativeBase: 0,
  };
  let amplifierEState: SystemState = {
    state: [...initialState],
    index: 0,
    halted: false,
    output: [],
    input: [phases[4]],
    relativeBase: 0,
  };

  while (!amplifierEState.halted) {
    const possibleOutput = amplifierAState.input[0];
    amplifierAState = runUntilOutputOrHalt(amplifierAState);
    const aOutput = amplifierAState.output.pop();
    if (amplifierAState.halted) {
      return possibleOutput;
    }
    amplifierBState.input.push(aOutput!);

    amplifierBState = runUntilOutputOrHalt(amplifierBState);
    const bOutput = amplifierBState.output.pop();
    amplifierCState.input.push(bOutput!);

    amplifierCState = runUntilOutputOrHalt(amplifierCState);
    const cOutput = amplifierCState.output.pop();
    amplifierDState.input.push(cOutput!);

    amplifierDState = runUntilOutputOrHalt(amplifierDState);
    const dOutput = amplifierDState.output.pop();
    amplifierEState.input.push(dOutput!);

    amplifierEState = runUntilOutputOrHalt(amplifierEState);
    const eOutput = amplifierEState.output.pop();
    amplifierAState.input.push(eOutput!);
  }

  throw new Error('whut?');
};

export class Puzzle201907 extends PuzzleDay {
  part1() {
    const initialState = parseInput(this.input);
    const trialPhases = permutator([0, 1, 2, 3, 4]);
    const outputs = trialPhases.map(phase =>
      runAplifiersWithPhases(initialState, phase),
    );
    return `${Math.max(...outputs)}`;
  }

  part2() {
    const initialState = parseInput(this.input);
    const trialPhases = permutator([5, 6, 7, 8, 9]);
    const outputs = trialPhases.map(phase =>
      runAmplifierLoop(initialState, phase),
    );

    return `${Math.max(...outputs)}`;
  }
}
