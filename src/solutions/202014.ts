import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type MaskCommand = {
  command: 'MASK',
  bitmask: string[],
};

type MemCommand = {
  command: 'MEM',
  location: number,
  binaryLocation: string[],
  value: number,
  binaryValue: string[],
};

type Command = MaskCommand | MemCommand;

export const parseInput = (input: string): Command[] => {
  const rawCommands = splitLines(input).map(v => v.split('=').map(c => c.trim()));
  const commands: Command[] = rawCommands.map(c => {
    if (c[0] === 'mask') {
      return ({
        command: 'MASK',
        bitmask: c[1].split(''),
      });
    } else {
      const [, strLoc] = c[0].match(/mem\[(\d*)\]/) ?? [];
      if (!strLoc) throw new Error('Invalid input');
      return ({
        command: 'MEM',
        location: parseInt(strLoc, 10),
        binaryLocation: parseInt(strLoc, 10).toString(2).padStart(36, '0').split(''),
        value: parseInt(c[1], 10),
        binaryValue: parseInt(c[1], 10).toString(2).padStart(36, '0').split(''),
      });
    }
  });
  return commands;
};

const applyMask = (value: string[], mask: string[]): string[] => mask.map((v, i) => v === 'X' ? value[i] : v);

const runCommandsV1 = (commands: Command[]): number[] =>
  commands.reduce<{ memory: number[], mask: string[] }>(({ memory, mask }, command) => {
    if (command.command === 'MASK') {
      return {
        memory,
        mask: command.bitmask,
      };
    }
    const masked = applyMask(command.binaryValue, mask);
    memory[command.location] = parseInt(masked.join(''), 2);
    return {
      memory,
      mask
    };
  }, { memory: [], mask: ''.padStart(36, 'X').split('') }).memory;

const getMaskedLocations = (baseLocation: string[], mask: string[]): string[] =>
  mask.reduce<string[][]>((locations, maskValue, index) => {
    if (maskValue === '1') {
      return locations.map(l => [...l, '1']);
    } else if (maskValue === '0') {
      return locations.map(l => [...l, baseLocation[index]]);
    } else {
      return [
        ...locations.map(l => [...l, '1']),
        ...locations.map(l => [...l, '0']),
      ];
    }
  }, [[]]).map(l => parseInt(l.join(''), 2).toString());


const runCommandsV2 = (commands: Command[]): { [key: string]: number } =>
  commands.reduce<{ memory: { [key: string]: number }, mask: string[] }>(({ memory, mask }, command) => {
    if (command.command === 'MASK') {
      return {
        memory,
        mask: command.bitmask,
      };
    }
    const memoryLocations: string[] = getMaskedLocations(command.binaryLocation, mask);
    memoryLocations.forEach(l => memory[l] = command.value);
    return {
      memory,
      mask
    };
  }, { memory: {}, mask: ''.padStart(36, 'X').split('') }).memory;

export class Puzzle202014 extends PuzzleDay {
  part1() {
    const commands = parseInput(this.input);
    const finalMemory = runCommandsV1(commands);
    const value = finalMemory.reduce((sum, curr) => sum + curr, 0);
    return `${value}`;
  }

  part2() {
    const commands = parseInput(this.input);
    const finalMemory = runCommandsV2(commands);
    const value = Object.values(finalMemory).reduce((sum, curr) => sum + BigInt(curr), 0n);
    return `${value}`;
  }
}
