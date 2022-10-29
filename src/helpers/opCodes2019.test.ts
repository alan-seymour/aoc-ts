import { describe, test, expect, beforeEach } from 'vitest';
import { IntCodeComputer } from './opCodes2019';

describe('Op codes', () => {
  describe('getValue Tests', () => {
    test('getValue in position mode', () => {
      const computer = new IntCodeComputer({ state: [1, 2, 3] });
      const result = computer.getValue(1, 'Position');
      expect(result).toEqual(3);
    });

    test('getValue in immediate mode', () => {
      const computer = new IntCodeComputer({ state: [1, 2, 3] });
      const result = computer.getValue(1, 'Immediate');
      expect(result).toEqual(2);
    });

    test('getValue in relative mode with 0 base', () => {
      const computer = new IntCodeComputer({ state: [1, 2, 3] });
      const result = computer.getValue(1, 'Relative');
      expect(result).toEqual(3);
    });

    test('getValue in relative mode with -2 base', () => {
      const computer = new IntCodeComputer({
        state: [1, 2, 3],
        relativeBase: -2,
      });

      const result = computer.getValue(1, 'Relative');
      expect(result).toEqual(1);
    });

    test('getValue in default mode', () => {
      const computer = new IntCodeComputer({ state: [1, 2, 3] });
      const result = computer.getValue(1, undefined);
      expect(result).toEqual(3);
    });
  });

  describe('Op code tests', () => {
    test('opcode 1 mode 0', () => {
      const computer = new IntCodeComputer({ state: [1, 2, 3, 4] });
      computer.step();
      expect(computer.state).toEqual([1, 2, 3, 4, 7]);
      expect(computer.index).toEqual(4);
    });

    test('opcode 1 mode 1', () => {
      const computer = new IntCodeComputer({ state: [1101, 2, 3, 4] });
      computer.step();
      expect(computer.state).toEqual([1101, 2, 3, 4, 5]);
      expect(computer.index).toEqual(4);
    });

    test('opcode 2', () => {
      const computer = new IntCodeComputer({ state: [2, 2, 3, 4] });
      computer.step();
      expect(computer.state).toEqual([2, 2, 3, 4, 12]);
      expect(computer.index).toEqual(4);
    });

    test('opcode 3 available input', () => {
      const computer = new IntCodeComputer({ state: [3, 2, 13], input: [7] });
      computer.step();
      expect(computer.state).toEqual([3, 2, 7]);
      expect(computer.input).toEqual([]);
      expect(computer.index).toEqual(2);
    });

    test('opcode 3 no available input', () => {
      const computer = new IntCodeComputer({ state: [3, 2, 13] });
      computer.step();
      expect(computer.state).toEqual([3, 2, 13]);
      expect(computer.index).toEqual(0);
      expect(computer.waitingForInput).toEqual(true);
    });

    test('opcode 4', () => {
      const computer = new IntCodeComputer({ state: [4, 2, 13] });
      computer.step();
      expect(computer.index).toEqual(2);
      expect(computer.output).toEqual([13]);
    });

    test('opcode 9', () => {
      const computer = new IntCodeComputer({
        state: [9, 2, 13],
        relativeBase: 5,
      });

      computer.step();
      expect(computer.index).toEqual(2);
      expect(computer.relativeBase).toEqual(18);
    });

    test('opcode 9 example 1', () => {
      const computer = new IntCodeComputer({
        state: [109, 19],
        relativeBase: 2000,
      });

      computer.step();
      expect(computer.relativeBase).toEqual(2019);
    });

    test('opcode 99', () => {
      const computer = new IntCodeComputer({ state: [99, 2, 3, 4] });
      computer.step();
      expect(computer.halted).toEqual(true);
    });
  });

  describe('Example tests', () => {
    test('201902 example 1', () => {
      const computer = new IntCodeComputer({ state: [1002, 4, 3, 4, 33] });
      computer.step();
      expect(computer.state).toEqual([1002, 4, 3, 4, 99]);
      expect(computer.index).toEqual(4);
    });

    test('201902 runToCompletion example 1', () => {
      const computer = new IntCodeComputer({
        state: [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
      });

      computer.runUntilWaitingForInput();
      expect(computer.halted).toEqual(true);
      expect(computer.index).toEqual(8);

      expect(computer.state).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
    });

    test('8 equal to 8 position', () => {
      const computer = new IntCodeComputer({
        state: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [8],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(1);
    });

    test('7 equal to 8 position', () => {
      const computer = new IntCodeComputer({
        state: [3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [7],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(0);
    });

    test('7 less than 8 position', () => {
      const computer = new IntCodeComputer({
        state: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [7],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(1);
    });

    test('9 less than 8 position', () => {
      const computer = new IntCodeComputer({
        state: [3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8],
        input: [9],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(0);
    });

    test('8 equal to 8 immediate', () => {
      const computer = new IntCodeComputer({
        state: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
        input: [8],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(1);
    });

    test('7 equal to 8 immediate', () => {
      const computer = new IntCodeComputer({
        state: [3, 3, 1108, -1, 8, 3, 4, 3, 99],
        input: [7],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(0);
    });

    test('7 less than 8 immediate', () => {
      const computer = new IntCodeComputer({
        state: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
        input: [7],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(1);
    });

    test('9 less than 8 immediate', () => {
      const computer = new IntCodeComputer({
        state: [3, 3, 1107, -1, 8, 3, 4, 3, 99],
        input: [9],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(0);
    });

    test('jump non zero input position', () => {
      const computer = new IntCodeComputer({
        state: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
        input: [9],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(1);
    });

    test('jump zero input position', () => {
      const computer = new IntCodeComputer({
        state: [3, 12, 6, 12, 15, 1, 13, 14, 13, 4, 13, 99, -1, 0, 1, 9],
        input: [0],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(0);
    });

    test('jump non zero input immediate', () => {
      const computer = new IntCodeComputer({
        state: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
        input: [9],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(1);
    });

    test('jump zero input immediate', () => {
      const computer = new IntCodeComputer({
        state: [3, 3, 1105, -1, 9, 1101, 0, 0, 12, 4, 12, 99, 1],
        input: [0],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(0);
    });

    test('201909 part 1 output 16 digit', () => {
      const computer = new IntCodeComputer({
        state: [1102, 34915192, 34915192, 7, 4, 7, 99, 0],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0].toString().length).toEqual(16);
    });

    test('201909 part 1 output large number in middle', () => {
      const computer = new IntCodeComputer({
        state: [104, 1125899906842624, 99],
      });

      computer.runUntilWaitingForInput();
      expect(computer.output[0]).toEqual(1125899906842624);
    });

    test('201909 part 1 output copy', () => {
      const computer = new IntCodeComputer({
        state: [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99],
      });

      computer.runUntilWaitingForInput();

      expect(computer.output).toEqual([
        109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99,
      ]);
    });
  });
});
