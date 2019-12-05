import { SystemState, runToCompletetion, runOpcode } from './opCodes2019';

describe('Op codes', () => {
  test('opcode 1 mode 0', () => {
    const input: SystemState = {
      state: [1, 2, 3, 4],
      index: 0,
      halted: false,
      input: [],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [1, 2, 3, 4, 7],
      index: 4,
      halted: false,
      input: [],
      output: [],
    });
  });

  test('opcode 1 mode 1', () => {
    const input: SystemState = {
      state: [1101, 2, 3, 4],
      index: 0,
      halted: false,
      input: [],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [1101, 2, 3, 4, 5],
      index: 4,
      halted: false,
      input: [],
      output: [],
    });
  });

  test('opcode 2', () => {
    const input: SystemState = {
      state: [2, 2, 3, 4],
      index: 0,
      halted: false,
      input: [],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [2, 2, 3, 4, 12],
      index: 4,
      halted: false,
      input: [],
      output: [],
    });
  });

  test('opcode 3', () => {
    const input: SystemState = {
      state: [3, 2, 13],
      index: 0,
      halted: false,
      input: [7],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [3, 2, 7],
      index: 2,
      halted: false,
      input: [],
      output: [],
    });
  });

  test('opcode 4', () => {
    const input: SystemState = {
      state: [4, 2, 13],
      index: 0,
      halted: false,
      input: [],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [4, 2, 13],
      index: 2,
      halted: false,
      input: [],
      output: [13],
    });
  });

  test('opcode 99', () => {
    const input: SystemState = {
      state: [99, 2, 3, 4],
      index: 0,
      halted: false,
      input: [],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [99, 2, 3, 4],
      index: 1,
      halted: true,
      input: [],
      output: [],
    });
  });

  test('opcode ?', () => {
    const input: SystemState = {
      state: [10, 2, 3, 4],
      index: 0,
      halted: false,
      input: [],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [10, 2, 3, 4],
      index: 0,
      halted: false,
      input: [],
      output: [],
    });
  });

  test('201902 example 1', () => {
    const input: SystemState = {
      state: [1002, 4, 3, 4, 33],
      index: 0,
      halted: false,
      input: [],
      output: [],
    };
    const result = runOpcode(input);
    expect(result).toEqual({
      state: [1002, 4, 3, 4, 99],
      index: 4,
      halted: false,
      input: [],
      output: [],
    });
  });

  test('201902 runToCompletion example 1', () => {
    const input = [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50];
    const result = runToCompletetion(input, []);
    expect(result).toEqual({
      halted: true,
      index: 9,
      input: [],
      output: [],
      state: [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
    });
  });

  test('8 equal to 8 position', () => {
    const input = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
    const result = runToCompletetion(input, [8]);
    expect(result.output[0]).toEqual(1);
  });

  test('7 equal to 8 position', () => {
    const input = [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8];
    const result = runToCompletetion(input, [7]);
    expect(result.output[0]).toEqual(0);
  });

  test('7 less than 8 position', () => {
    const input = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
    const result = runToCompletetion(input, [7]);
    expect(result.output[0]).toEqual(1);
  });

  test('9 less than 8 position', () => {
    const input = [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8];
    const result = runToCompletetion(input, [9]);
    expect(result.output[0]).toEqual(0);
  });

  test('8 equal to 8 immediate', () => {
    const input = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
    const result = runToCompletetion(input, [8]);
    expect(result.output[0]).toEqual(1);
  });

  test('7 equal to 8 immediate', () => {
    const input = [3, 3, 1108, -1, 8, 3, 4, 3, 99];
    const result = runToCompletetion(input, [7]);
    expect(result.output[0]).toEqual(0);
  });

  test('7 less than 8 immediate', () => {
    const input = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
    const result = runToCompletetion(input, [7]);
    expect(result.output[0]).toEqual(1);
  });

  test('9 less than 8 immediate', () => {
    const input = [3, 3, 1107, -1, 8, 3, 4, 3, 99];
    const result = runToCompletetion(input, [9]);
    expect(result.output[0]).toEqual(0);
  });

  test('jump non zero input position', () => {
    const input = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
    const result = runToCompletetion(input, [9]);
    expect(result.output[0]).toEqual(1);
  });

  test('jump zero input position', () => {
    const input = [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9];
    const result = runToCompletetion(input, [0]);
    expect(result.output[0]).toEqual(0);
  });

  test('jump non zero input immediate', () => {
    const input = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
    const result = runToCompletetion(input, [9]);
    expect(result.output[0]).toEqual(1);
  });

  test('jump zero input immediate', () => {
    const input = [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1];
    const result = runToCompletetion(input, [0]);
    expect(result.output[0]).toEqual(0);
  });
});
