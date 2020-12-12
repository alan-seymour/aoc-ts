import { permutator, IntCodeComputer } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export const runAplifiersWithPhases = (
  state: number[],
  phases: number[],
): number => {
  const amplifierA = new IntCodeComputer({
    state: state,
    input: [phases[0], 0],
  });
  amplifierA.runUntilWaitingForInput();

  const amplifierB = new IntCodeComputer({
    state: state,
    input: [phases[1], amplifierA.output.pop()!],
  });
  amplifierB.runUntilWaitingForInput();

  const amplifierC = new IntCodeComputer({
    state: state,
    input: [phases[2], amplifierB.output.pop()!],
  });
  amplifierC.runUntilWaitingForInput();

  const amplifierD = new IntCodeComputer({
    state: state,
    input: [phases[3], amplifierC.output.pop()!],
  });
  amplifierD.runUntilWaitingForInput();

  const amplifierE = new IntCodeComputer({
    state: state,
    input: [phases[4], amplifierD.output.pop()!],
  });
  amplifierE.runUntilWaitingForInput();

  return amplifierE.output[0];
};

export const runAmplifierLoop = (
  initialState: number[],
  phases: number[],
): number => {
  const amplifierA = new IntCodeComputer({
    state: initialState,
    input: [phases[0], 0],
  });
  const amplifierB = new IntCodeComputer({
    state: initialState,
    input: [phases[1]],
  });
  const amplifierC = new IntCodeComputer({
    state: initialState,
    input: [phases[2]],
  });
  const amplifierD = new IntCodeComputer({
    state: initialState,
    input: [phases[3]],
  });
  const amplifierE = new IntCodeComputer({
    state: initialState,
    input: [phases[4]],
  });
  let answer = 0;

  while (!amplifierA.halted) {
    amplifierA.runUntilWaitingForInput();

    amplifierB.input.push(amplifierA.output.pop()!);
    amplifierB.runUntilWaitingForInput();

    amplifierC.input.push(amplifierB.output.pop()!);
    amplifierC.runUntilWaitingForInput();

    amplifierD.input.push(amplifierC.output.pop()!);
    amplifierD.runUntilWaitingForInput();

    amplifierE.input.push(amplifierD.output.pop()!);
    amplifierE.runUntilWaitingForInput();
    const eOutput = amplifierE.output.pop();

    amplifierA.input.push(eOutput!);
    answer = eOutput!;
  }
  return answer;
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
