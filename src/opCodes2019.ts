import { equal } from 'assert';

export type SystemState = {
  state: number[];
  index: number;
  halted: boolean;
  input: number[];
  output: number[];
  relativeBase: number;
  waitingForInput: boolean;
};

type ParameterMode = 'Position' | 'Immediate' | 'Relative';

const intToMode: { [k: number]: ParameterMode } = {
  0: 'Position',
  1: 'Immediate',
  2: 'Relative',
};

const fieldToOpcode = (
  value: number,
): { opcode: number; modes: ParameterMode[] } => {
  const split = value.toString().split('');
  if (split.length <= 1) {
    return {
      opcode: value,
      modes: [],
    };
  }

  const opcode = parseInt(split.splice(-2).join(''), 10);
  const modes = split.reverse().map(v => intToMode[parseInt(v, 10)]);
  return {
    opcode,
    modes,
  };
};

export const getValue = (
  state: number[],
  position: number,
  mode: ParameterMode | undefined,
  relativeBase: number,
): number => {
  let value: number;
  switch (mode) {
    case 'Immediate':
      value = state[position];
      break;
    case 'Relative':
      value = state[state[position] + relativeBase];
      break;
    case 'Position':
    default:
      value = state[state[position]];
      break;
  }
  return value ? value : 0;
};

export const getWriteLocation = (
  state: number[],
  position: number,
  mode: ParameterMode | undefined,
  relativeBase: number,
): number => {
  if (mode === 'Relative') {
    return state[position] + relativeBase;
  }
  return state[position];
};

export const add = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  const param2 = getValue(state, index + 2, modes.shift(), relativeBase);
  const writeLocation = getWriteLocation(
    state,
    index + 3,
    modes.shift(),
    relativeBase,
  );
  state[writeLocation] = param1 + param2;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

export const multiply = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  const param2 = getValue(state, index + 2, modes.shift(), relativeBase);
  const writeLocation = getWriteLocation(
    state,
    index + 3,
    modes.shift(),
    relativeBase,
  );
  state[writeLocation] = param1 * param2;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

export const readInput = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  if (input.length === 0) {
    return {
      state: [...state],
      index,
      halted: false,
      input: [...input],
      output: [...output],
      relativeBase,
      waitingForInput: true,
    };
  }
  const writeLocation = getWriteLocation(
    state,
    index + 1,
    modes.shift(),
    relativeBase,
  );
  const inputValue = input.shift();
  state[writeLocation] = inputValue ? inputValue : 0;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 2,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

export const writeOutput = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  return {
    state: [...state],
    index: index + 2,
    halted: false,
    input: [...input],
    output: [...output, param1],
    relativeBase,
    waitingForInput: false,
  };
};

export const jumpIfTrue = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  const param2 = getValue(state, index + 2, modes.shift(), relativeBase);
  return {
    state: [...state],
    index: param1 !== 0 ? param2 : index + 3,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

export const jumpIfFalse = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  const param2 = getValue(state, index + 2, modes.shift(), relativeBase);
  return {
    state: [...state],
    index: param1 === 0 ? param2 : index + 3,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

export const lessThan = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  const param2 = getValue(state, index + 2, modes.shift(), relativeBase);
  const writeLocation = getWriteLocation(
    state,
    index + 3,
    modes.shift(),
    relativeBase,
  );
  state[writeLocation] = param1 < param2 ? 1 : 0;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

export const equalTo = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  const param2 = getValue(state, index + 2, modes.shift(), relativeBase);
  const writeLocation = getWriteLocation(
    state,
    index + 3,
    modes.shift(),
    relativeBase,
  );
  state[writeLocation] = param1 === param2 ? 1 : 0;
  return {
    state: [...state],
    index: index === writeLocation ? index : index + 4,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

export const adjustRelativeBase = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  const param1 = getValue(state, index + 1, modes.shift(), relativeBase);
  return {
    state: [...state],
    index: index + 2,
    halted: false,
    input: [...input],
    output: [...output],
    relativeBase: relativeBase + param1,
    waitingForInput: false,
  };
};

export const halt = (
  { state, index, input, output, halted, relativeBase }: SystemState,
  modes: ParameterMode[],
): SystemState => {
  return {
    state: [...state],
    index: index + 1,
    halted: true,
    input: [...input],
    output: [...output],
    relativeBase,
    waitingForInput: false,
  };
};

type OpCodeFunction = (
  state: SystemState,
  modes: ParameterMode[],
) => SystemState;

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
  9: adjustRelativeBase,
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
    relativeBase: 0,
    waitingForInput: false,
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
    relativeBase: 0,
    waitingForInput: false,
  };

  while (!runningState.halted && runningState.output.length === 0) {
    runningState = runOpcode(runningState);
  }
  return runningState;
};

export const runUntilWaitingForInput = ({
  state,
  index,
  halted,
  relativeBase,
  input,
}: SystemState): SystemState => {
  let runningState: SystemState = {
    state: [...state],
    index,
    halted,
    output: [],
    input: [...input],
    relativeBase: relativeBase,
    waitingForInput: false,
  };

  while (!runningState.halted && !runningState.waitingForInput) {
    runningState = runOpcode(runningState);
  }
  return runningState;
};
