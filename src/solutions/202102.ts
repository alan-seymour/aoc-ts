import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Command = {
  direction: string;
  distance: number;
};

type Location = {
  depth: number;
  forward: number;
  aim: number;
};

export const parseInput = (input: string): Command[] =>
  splitLines(input).map(l => {
    const [direction, dStr] = l.split(' ');
    return { direction, distance: parseInt(dStr, 10) };
  });

const parseCommandsPart1 = (commands: Command[]): Location =>
  commands.reduce<Location>(
    ({ depth, forward, aim }, command) => {
      switch (command.direction) {
        case 'forward':
          return { depth, forward: forward + command.distance, aim };
        case 'down':
          return { depth: depth + command.distance, forward, aim };
        case 'up':
          return { depth: depth - command.distance, forward, aim };
        default:
          return { depth, forward, aim };
      }
    },
    { depth: 0, forward: 0, aim: 0 },
  );

const parseCommandsPart2 = (commands: Command[]): Location =>
  commands.reduce<Location>(
    ({ depth, forward, aim }, command) => {
      switch (command.direction) {
        case 'forward':
          return {
            depth: depth + aim * command.distance,
            forward: forward + command.distance,
            aim,
          };
        case 'down':
          return { depth, forward, aim: aim + command.distance };
        case 'up':
          return { depth, forward, aim: aim - command.distance };
        default:
          return { depth, forward, aim };
      }
    },
    { depth: 0, forward: 0, aim: 0 },
  );

export class Puzzle202102 extends PuzzleDay {
  part1() {
    const commands = parseInput(this.input);
    const finalLocation = parseCommandsPart1(commands);
    return `${finalLocation.depth * finalLocation.forward}`;
  }

  part2() {
    const commands = parseInput(this.input);
    const finalLocation = parseCommandsPart2(commands);
    return `${finalLocation.depth * finalLocation.forward}`;
  }
}
