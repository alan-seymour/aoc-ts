import { equal } from 'assert';

export type SystemState = {
  state: number[];
  index: number;
  halted: boolean;
  input: number[];
  output: number[];
};

const fieldToOpcode = (value: number): { opcode: number; modes: number[] } => {
  const split = value.toString().split('');
  if (split.length <= 1) {
    return {
      opcode: value,
      modes: [],
    };
  }

  const opcode = parseInt(split.splice(-2).join(''), 10);
  const modes = split.reverse().map(v => parseInt(v, 10));
  return {
    opcode,
    modes,
  };
};

const getValue = (
  state: number[],
  position: number,
  mode: number | undefined,
): number => {
  if (mode === 1) {
    return state[position];
  }
  return state[state[position]];
};

export const add = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift());
  const param2 = getValue(state, index + 2, modes.shift());
  const writeLocation = getValue(state, index + 3, 1);
  state[writeLocation] = param1 + param2;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
  };
};

export const multiply = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift());
  const param2 = getValue(state, index + 2, modes.shift());
  const writeLocation = getValue(state, index + 3, 1);
  state[writeLocation] = param1 * param2;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
  };
};

export const readInput = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const writeLocation = getValue(state, index + 1, 1);
  const inputValue = input.shift();
  state[writeLocation] = inputValue ? inputValue : 0;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 2,
    halted: false,
    input: [...input],
    output: [...output],
  };
};

export const writeOutput = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift());
  return {
    state: [...state],
    index: index + 2,
    halted: false,
    input: [...input],
    output: [...output, param1],
  };
};

export const jumpIfTrue = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift());
  const param2 = getValue(state, index + 2, modes.shift());
  return {
    state: [...state],
    index: param1 !== 0 ? param2 : index + 3,
    halted: false,
    input: [...input],
    output: [...output],
  };
};

export const jumpIfFalse = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift());
  const param2 = getValue(state, index + 2, modes.shift());
  return {
    state: [...state],
    index: param1 === 0 ? param2 : index + 3,
    halted: false,
    input: [...input],
    output: [...output],
  };
};

export const lessThan = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift());
  const param2 = getValue(state, index + 2, modes.shift());
  const writeLocation = getValue(state, index + 3, 1);
  state[writeLocation] = param1 < param2 ? 1 : 0;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
  };
};

export const equalTo = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift());
  const param2 = getValue(state, index + 2, modes.shift());
  const writeLocation = getValue(state, index + 3, 1);
  state[writeLocation] = param1 === param2 ? 1 : 0;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
  };
};

export const halt = (
  { state, index, input, output, halted }: SystemState,
  modes: number[],
): SystemState => {
  return {
    state: [...state],
    index: index + 1,
    halted: true,
    input: [...input],
    output: [...output],
  };
};

type OpCodeFunction = (state: SystemState, modes: number[]) => SystemState;

type OpCodes = {
  [key: number]: OpCodeFunction;
};

const codes: OpCodes = {
  1: add,
  2: multiply,
  3: readInput,
  4: writeOutput,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: lessThan,
  8: equalTo,
  99: halt,
};

export const runOpcode = (state: SystemState): SystemState => {
  const opcode = fieldToOpcode(state.state[state.index]);
  if (codes[opcode.opcode]) {
    return codes[opcode.opcode](state, opcode.modes);
  }
  return state;
};

export const runToCompletetion = (
  initialState: number[],
  input: number[],
): SystemState => {
  let state: SystemState = {
    state: [...initialState],
    index: 0,
    halted: false,
    output: [],
    input,
  };

  while (!state.halted) {
    state = runOpcode(state);
  }
  return state;
};

export const runUntilOutputOrHalt = ({
  state,
  index,
  halted,
  input,
}: SystemState): SystemState => {
  let runningState: SystemState = {
    state: [...state],
    index,
    halted,
    output: [],
    input: [...input],
  };

  while (!runningState.halted && runningState.output.length === 0) {
    runningState = runOpcode(runningState);
  }
  return runningState;
};
