import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (
  input: string,
): {
  orderRules: Map<number, number[]>;
  invertedOrderRules: Map<number, number[]>;
  updates: number[][];
} => {
  const lines = splitLines(input);
  const rawOrderRules = [];
  const rawUpdates = [];
  let i = 0;

  while (i < lines.length && lines[i] !== '') {
    rawOrderRules.push(lines[i]);
    i++;
  }

  i++;

  while (i < lines.length) {
    rawUpdates.push(lines[i]);
    i++;
  }

  const orderRules = new Map<number, number[]>();
  const invertedOrderRules = new Map<number, number[]>();

  rawOrderRules.forEach(line => {
    const [pre, post] = line.split('|').map(x => Number(x));

    orderRules.set(pre, [...(orderRules.get(pre) ?? []), post]);
    invertedOrderRules.set(post, [...(invertedOrderRules.get(post) ?? []), pre]);
  });

  const updates = rawUpdates.map(line => line.split(',').map(x => Number(x)));

  return { orderRules, invertedOrderRules, updates };
};

const validateUpdate = (update: number[], orderRules: Map<number, number[]>): boolean => {
  const previous: number[] = [];
  let i = 0;

  while (i < update.length) {
    const current = update[i];
    const disallowed = orderRules.get(current) ?? [];

    if (disallowed.some(x => previous.includes(x))) {
      return false;
    }

    previous.push(current);
    i++;
  }

  return true;
};

const getMiddle = (update: number[]): number => {
  const middle = Math.floor(update.length / 2);

  return update[middle];
};

const fixOrdering = (update: number[], orderRules: Map<number, number[]>): number[] => {
  const fixed: number[] = [];
  let offset = 0;

  while (update.length > 0) {
    const next = update[offset];

    const rules = orderRules.get(next) ?? [];

    if (rules.some(x => update.includes(x))) {
      offset++;
    } else {
      fixed.push(next);
      update.splice(offset, 1);
      offset = 0;
    }
  }

  return fixed;
};

export class Puzzle202405 extends PuzzleDay {
  part1() {
    const { orderRules, updates } = parseInput(this.input);
    const validUpdates = updates.filter(update => validateUpdate(update, orderRules));
    const middleValues = validUpdates.map(update => getMiddle(update));
    const sum = middleValues.reduce((acc, x) => acc + x, 0);
    return `${sum}`;
  }

  part2() {
    const { orderRules, updates, invertedOrderRules } = parseInput(this.input);
    const invalidUpdates = updates.filter(update => !validateUpdate(update, orderRules));
    const fixed = invalidUpdates.map(update => fixOrdering(update, invertedOrderRules));
    const middleValues = fixed.map(update => getMiddle(update));
    const sum = middleValues.reduce((acc, x) => acc + x, 0);
    return `${sum}`;
  }
}
