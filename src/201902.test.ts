import {
  parseInput,
  SystemState,
  runToCompletetion,
  runOpcode
} from './201902';

describe('201902', () => {
  test('parseInput', () => {
    const input = `3500,9,10,70,2,3,11,0,99,30,40,50`;
    const result = parseInput(input);
    expect(result).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  test('opcode 1', () => {
    const input: SystemState = {
      state: [1, 2, 3, 4],
      index: 0,
      halted: false
    };
    const result = runOpcode(input);
    expect(result).toEqual({ state: [1, 2, 3, 4, 7], index: 4, halted: false });
  });

  test('opcode 2', () => {
    const input: SystemState = {
      state: [2, 2, 3, 4],
      index: 0,
      halted: false
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [2, 2, 3, 4, 12],
      index: 4,
      halted: false
    });
  });

  test('opcode 99', () => {
    const input: SystemState = {
      state: [99, 2, 3, 4],
      index: 0,
      halted: false
    };
    const result = runOpcode(input);
    expect(result).toEqual({ state: [99, 2, 3, 4], index: 1, halted: true });
  });

  test('opcode ?', () => {
    const input: SystemState = {
      state: [4, 2, 3, 4],
      index: 0,
      halted: false
    };
    const result = runOpcode(input);
    expect(result).toEqual({ state: [4, 2, 3, 4], index: 0, halted: false });
  });

  test('runToCompletion example 1', () => {
    const input = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    const result = runToCompletetion(9, 10, input);
    expect(result).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  test('runToCompletion example 2', () => {
    const input = [1, 0, 0, 0, 99];
    const result = runToCompletetion(0, 0, input);
    expect(result).toEqual([2, 0, 0, 0, 99]);
  });

  test('runToCompletion example 3', () => {
    const input = [2, 3, 0, 3, 99];
    const result = runToCompletetion(3, 0, input);
    expect(result).toEqual([2, 3, 0, 6, 99]);
  });

  test('runToCompletion example 4', () => {
    const input = [2, 4, 4, 5, 99, 0];
    const result = runToCompletetion(4, 4, input);
    expect(result).toEqual([2, 4, 4, 5, 99, 9801]);
  });

  test('runToCompletion example 4', () => {
    const input = [1, 1, 1, 4, 99, 5, 6, 0, 99];
    const result = runToCompletetion(1, 1, input);
    expect(result).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
  });
});
