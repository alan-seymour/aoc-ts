import { chunk } from 'lodash';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): [string[][], [number, number, number][]] => {
  const lines = input.split(/\r?\n/);
  const split = lines.findIndex(line => line === '');
  const initialStateInput = lines.slice(0, split - 1);
  const initialState = parseInitialState(initialStateInput);

  const movesInput = lines.slice(split + 1);

  const moves: [number, number, number][] = movesInput.map(line => {
    const matches = (line.trim().match(/move (\d+) from (\d+) to (\d+)/) ?? []).map(v =>
      parseInt(v, 10),
    );

    return [matches[1], matches[2], matches[3]];
  });

  return [initialState, moves];
};

const parseInitialState = (lines: string[]): string[][] => {
  const output: string[][] = [];

  lines.forEach(line => {
    const chunks = chunk(
      line.split('').filter((c, i) => i % 4 !== 3),
      3,
    );

    chunks.forEach((crate, index) => {
      if (crate.every(c => c === ' ')) {
        return;
      }

      if (!output[index]) {
        output[index] = [];
      }

      output[index].push(crate[1]);
    });
  });

  return output;
};

const applyMove = (
  state: string[][],
  [count, from, to]: [number, number, number],
  reverse: boolean,
): string[][] => {
  const taken = state[from - 1].slice(0, count);

  if (reverse) {
    taken.reverse();
  }

  state[from - 1] = state[from - 1].slice(count);

  if (!state[to - 1]) {
    state[to - 1] = [];
  }

  state[to - 1] = [...taken, ...state[to - 1]];

  return state;
};

export class Puzzle202205 extends PuzzleDay {
  part1() {
    const [state, moves] = parseInput(this.input);
    const result = moves.reduce((currState, move) => applyMove(currState, move, true), state);
    return `${result.map(c => c[0]).join('')}`;
  }

  part2() {
    const [state, moves] = parseInput(this.input);
    const result = moves.reduce((currState, move) => applyMove(currState, move, false), state);
    return `${result.map(c => c[0]).join('')}`;
  }
}
