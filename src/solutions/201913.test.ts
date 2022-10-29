import { describe, test, expect, beforeEach } from 'vitest';
import { parseInput, countBlocks, findSingleInstance, getNewGameState, GameState } from './201913';

describe('201913', () => {
  test('parseInput', () => {
    const input = `3500,9,10,70,2,3,11,0,99,30,40,50`;
    const result = parseInput(input);
    expect(result).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  test('countBlocks', () => {
    const output = [0, 1, 2, 3, 2, 1, 3, 4, 5, 1, 3, 2];
    const result = countBlocks(output);
    expect(result).toEqual(2);
  });

  test('findSingleInstance not found', () => {
    const output = [0, 1, 2, 3, 4, 5, 1, 2, 3, 5, 4, 2];
    const result = findSingleInstance(output, 1);
    expect(result).toEqual(undefined);
  });

  test('findSingleInstance', () => {
    const output = [0, 1, 2, 3, 4, 5, 1, 2, 4, 5, 4, 2];
    const result = findSingleInstance(output, 2);
    expect(result).toEqual([0, 1, 2]);
  });

  test('findSingleInstance with custom index', () => {
    const output = [0, 1, 2, 3, 4, 5, 1, 2, 4, 5, 4, 2];
    const result = findSingleInstance(output, 3, 0);
    expect(result).toEqual([3, 4, 5]);
  });

  test('getNewGameState ball left of paddle', () => {
    const grid: number[] = [];
    const gameState: GameState = { ballX: 0, paddleX: 1, paddleMovement: 0 };
    const result = getNewGameState(grid, gameState);
    expect(result.paddleMovement).toEqual(-1);
  });

  test('getNewGameState ball right of paddle', () => {
    const grid: number[] = [];
    const gameState: GameState = { ballX: 1, paddleX: 0, paddleMovement: 0 };
    const result = getNewGameState(grid, gameState);
    expect(result.paddleMovement).toEqual(1);
  });

  test('getNewGameState ball above paddle', () => {
    const grid: number[] = [];
    const gameState: GameState = { ballX: 1, paddleX: 1, paddleMovement: 0 };
    const result = getNewGameState(grid, gameState);
    expect(result.paddleMovement).toEqual(0);
  });
});
