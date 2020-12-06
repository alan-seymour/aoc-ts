import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

export const parseInput = (input: string): string[][] => {
  const groups = input.split(/\r?\n\r?\n/).map(group => group.split(/\r?\n/).map(line => line.trim()));
  return groups;
};

const toUnique = (input: string[]): string[] => {
  return alphabet.filter(letter => input.some(i => i.indexOf(letter) !== -1));
};

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const toOverlap = (input: string[]): string[] => {
  return alphabet.filter(letter => input.every(i => i.indexOf(letter) !== -1));
};

export class Puzzle202006 extends PuzzleDay {
  part1() {
    const groups = parseInput(this.input);
    const groupUniques = groups.map(toUnique);
    const sum = groupUniques.reduce((sum, v) => sum + v.length, 0);
    return `${sum}`;
  }

  part2() {
    const groups = parseInput(this.input);
    const groupOverlaps = groups.map(toOverlap);
    const sum = groupOverlaps.reduce((sum, v) => sum + v.length, 0);
    return `${sum}`;
  }
}
