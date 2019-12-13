import { permutator } from './helpers';
import { PuzzleDay } from './puzzleDay';
import {
  runToCompletetion,
  SystemState,
  runUntilWaitingForInput,
} from './opCodes2019';
import { chunk } from 'lodash';

export type GameState = {
  ballX: number;
  paddleX: number;
  paddleMovement: 0 | -1 | 1;
};

export const parseInput = (input: string) => {
  const numbers = input.split(',').map(num => parseInt(num, 10));
  return numbers;
};

export const countBlocks = (outputs: number[]): number =>
  outputs.filter((v: number, i: number) => i % 3 === 2 && v === 2).length;

export const findSingleInstance = (
  grid: number[],
  type: number,
  index: number = 2,
): number[] | undefined => chunk(grid, 3).find(chunk => chunk[index] === type);

export const getNewGameState = (
  grid: number[],
  gameState: GameState,
): GameState => {
  const ball = findSingleInstance(grid, 4)?.[0] ?? gameState.ballX;
  const paddle = findSingleInstance(grid, 3)?.[0] ?? gameState.paddleX;
  return {
    ballX: ball,
    paddleX: paddle,
    paddleMovement: ball > paddle ? 1 : paddle === ball ? 0 : -1,
  };
};

const playGame = (input: number[]): number => {
  const intCode = [...input];
  intCode[0] = 2;
  let state: SystemState = {
    state: intCode,
    index: 0,
    halted: false,
    input: [],
    output: [],
    waitingForInput: false,
    relativeBase: 0,
  };
  let gameState: GameState = {
    ballX: 0,
    paddleX: 0,
    paddleMovement: 0,
  };
  state = runUntilWaitingForInput(state);
  while (!state.halted) {
    gameState = getNewGameState(state.output, gameState);
    state.input.push(gameState.paddleMovement);
    state = runUntilWaitingForInput(state);
  }
  return findSingleInstance(state.output, -1, 0)?.[2] ?? 0;
};

export class Puzzle201913 extends PuzzleDay {
  part1() {
    const intcode = parseInput(this.input);
    const systemOutput = runToCompletetion(intcode, []);
    const blocks = countBlocks(systemOutput.output);
    return `${blocks}`;
  }

  part2() {
    const intcode = parseInput(this.input);
    const score = playGame(intcode);
    return `${score}`;
  }
}
