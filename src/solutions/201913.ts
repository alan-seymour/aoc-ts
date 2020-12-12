import { PuzzleDay } from '../puzzleDay';
import { IntCodeComputer } from '../helpers';
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
  const computer = new IntCodeComputer({ state: intCode });
  let gameState: GameState = {
    ballX: 0,
    paddleX: 0,
    paddleMovement: 0,
  };
  computer.runUntilWaitingForInput();
  while (!computer.halted) {
    gameState = getNewGameState(computer.output, gameState);
    computer.input.push(gameState.paddleMovement);
    computer.output = [];
    computer.runUntilWaitingForInput();
  }
  return findSingleInstance(computer.output, -1, 0)?.[2] ?? 0;
};

export class Puzzle201913 extends PuzzleDay {
  part1() {
    const intcode = parseInput(this.input);
    const computer = new IntCodeComputer({ state: intcode });
    computer.runUntilWaitingForInput();
    const blocks = countBlocks(computer.output);
    return `${blocks}`;
  }

  part2() {
    const intcode = parseInput(this.input);
    const score = playGame(intcode);
    return `${score}`;
  }
}
