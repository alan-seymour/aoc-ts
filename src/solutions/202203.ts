import { chunk, intersection } from 'lodash';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const lines = splitLines(input);
  return lines;
};

const findSplitItem = (bag: string): string => {
  const bagElems = bag.split('');

  const inter = intersection(
    bagElems.slice(0, bagElems.length / 2),
    bagElems.slice(bagElems.length / 2),
  );

  return inter.join('');
};

const items = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const findSharedItem = (bag1: string, bag2: string, bag3: string): string =>
  intersection(bag1.split(''), bag2.split(''), bag3.split('')).join('');

export class Puzzle202203 extends PuzzleDay {
  part1() {
    const total = parseInput(this.input)
      .map(line => findSplitItem(line))
      .map(dup => items.indexOf(dup) + 1)
      .reduce((c, s) => s + c, 0);

    return `${total}`;
  }

  part2() {
    const total = chunk(parseInput(this.input), 3)
      .map(([g0, g1, g2]) => findSharedItem(g0, g1, g2))
      .map(badge => items.indexOf(badge) + 1)
      .reduce((c, s) => c + s, 0);

    return `${total}`;
  }
}
