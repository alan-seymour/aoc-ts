import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export type BagRules = {
  [key: string]: {
    colour: string;
    quantity: number;
  }[];
};

const inputRegex = /^(.*) bags contain (.*)\./;

export const parseInput = (input: string): BagRules => {
  const lines = splitLines(input);

  const rules = lines.reduce((allRules, line) => {
    const [, outerBag, strRules] = line.match(/^(.*) bags contain (.*)\./) ?? [];

    const subRules = strRules
      .split(',')
      .map(subrule => {
        const [, count, colour] = subrule.match(/(\d+) (.*) bags?/) ?? [];
        return {
          colour,
          quantity: parseInt(count, 10),
        };
      })
      .filter(r => r.colour && r.quantity);

    return {
      ...allRules,
      [outerBag]: subRules,
    };
  }, {});

  return rules;
};

// export const findParents = (rules: BagRule[], child: string) => {

// }

export const invertRules = (rules: BagRules): BagRules => {
  const output: BagRules = {};

  Object.keys(rules).forEach(ruleKey => {
    rules[ruleKey].forEach(childRule => {
      if (!output[childRule.colour]) {
        output[childRule.colour] = [];
      }

      output[childRule.colour].push({ colour: ruleKey, quantity: childRule.quantity });
    });
  });

  return output;
};

export const findChildren = (rules: BagRules, root: string): string[] => {
  const children = new Set<string>([root]);
  const queue: string[] = [root];
  let colour = queue.shift();

  while (colour) {
    if (rules[colour]) {
      rules[colour].forEach(v => {
        if (!children.has(v.colour)) {
          queue.push(v.colour);
          children.add(v.colour);
        }
      });
    }

    colour = queue.shift();
  }

  return Array.from(children);
};

const cache = new Map<string, number>();

export const countInnerBags = (rules: BagRules, root: string): number => {
  if (cache.has(root)) {
    return cache.get(root) ?? 0;
  }

  if (!rules[root]) {
    cache.set(root, 1);
    return 1;
  }

  const sum = rules[root].reduce<number>((sum, curr) => {
    const innerSize = countInnerBags(rules, curr.colour);
    const totalSize = innerSize * curr.quantity;
    return sum + totalSize;
  }, 1);

  cache.set(root, sum);
  return sum;
};

export class Puzzle202007 extends PuzzleDay {
  part1() {
    const rules = parseInput(this.input);
    const inverted = invertRules(rules);
    const children = findChildren(inverted, 'shiny gold');
    return `${children.length - 1}`;
  }

  part2() {
    const rules = parseInput(this.input);
    const sum = countInnerBags(rules, 'shiny gold');
    return `${sum - 1}`;
  }
}
