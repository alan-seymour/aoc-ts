import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string => input.trim();

const groupString = (input: string): string[] =>
  input.split('').reduce<string[]>((chunks, char) => {
    const previous = chunks[chunks.length - 1] ?? '';

    if (previous.charAt(0) === char) {
      chunks[chunks.length - 1] = `${previous}${char}`;
    } else {
      chunks.push(char);
    }

    return chunks;
  }, []);

const iterateFromGroups = (groups: string[]): string =>
  groups.reduce<string>((carry, group) => `${carry}${group.length}${group.charAt(0)}`, '');

export class Puzzle201510 extends PuzzleDay {
  part1() {
    let input = parseInput(this.input);
    let chunks = groupString(input);

    for (let i = 0; i < 40; i++) {
      input = iterateFromGroups(chunks);
      chunks = groupString(input);
    }

    return `${input.length}`;
  }

  part2() {
    let input = parseInput(this.input);
    let chunks = groupString(input);

    for (let i = 0; i < 50; i++) {
      input = iterateFromGroups(chunks);
      chunks = groupString(input);
    }

    return `${input.length}`;
  }
}
