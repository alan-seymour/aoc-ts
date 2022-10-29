import { stat } from 'fs';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export type Command = {
  instruction: 'jmp' | 'nop' | 'acc';
  value: number;
};

export type SystemState = {
  acc: number;
  commands: Command[];
  pointer: number;
  pastCommandIndexes: Set<number>;
};

export const parseInput = (input: string): Command[] => {
  const lines = splitLines(input);

  const commands = lines.map(line => {
    const [cmd, val] = line.split(' ');
    return {
      instruction: cmdToInstruction(cmd),
      value: parseInt(val, 10),
    };
  });

  return commands;
};

const cmdToInstruction = (cmd: string): Command['instruction'] => {
  if (cmd === 'jmp' || cmd === 'nop' || cmd === 'acc') return cmd;
  return 'nop';
};

const runUntilLoopOrExit = (state: SystemState): SystemState => {
  while (!state.pastCommandIndexes.has(state.pointer) && state.pointer < state.commands.length) {
    const nextCommand = state.commands[state.pointer];
    state.pastCommandIndexes.add(state.pointer);

    if (nextCommand.instruction === 'nop') {
      state.pointer++;
    } else if (nextCommand.instruction === 'acc') {
      state.acc += nextCommand.value;
      state.pointer++;
    } else if (nextCommand.instruction === 'jmp') {
      state.pointer += nextCommand.value;
    }
  }

  return state;
};

const bruteForce2 = (state: SystemState): number => {
  for (let i = 0; i < state.commands.length; i++) {
    if (state.commands[i].instruction === 'acc') {
      continue;
    }

    const newState: SystemState = {
      acc: 0,
      pointer: 0,
      pastCommandIndexes: new Set<number>(),
      commands: state.commands.slice(),
    };

    if (state.commands[i].instruction === 'jmp') {
      newState.commands[i].instruction = 'nop';
    } else {
      newState.commands[i].instruction = 'jmp';
    }

    const result = runUntilLoopOrExit(newState);

    if (result.pointer === state.commands.length) {
      return result.acc;
    }

    if (newState.commands[i].instruction === 'jmp') {
      newState.commands[i].instruction = 'nop';
    } else {
      newState.commands[i].instruction = 'jmp';
    }
  }

  return 0;
};

export class Puzzle202008 extends PuzzleDay {
  part1() {
    const commands = parseInput(this.input);

    const state: SystemState = {
      acc: 0,
      commands,
      pointer: 0,
      pastCommandIndexes: new Set<number>(),
    };

    const finalState: SystemState = runUntilLoopOrExit(state);
    return `${finalState.acc}`;
  }

  part2() {
    const commands = parseInput(this.input);

    const state: SystemState = {
      acc: 0,
      commands,
      pointer: 0,
      pastCommandIndexes: new Set<number>(),
    };

    const result = bruteForce2(state);
    return `${result}`;
  }
}
