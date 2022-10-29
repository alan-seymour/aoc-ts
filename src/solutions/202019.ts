import { number } from 'yargs';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Rule = string | number[][];

const parseRules = (input: string): Rule[] => {
  const rules = splitLines(input).reduce<string[]>((rules, curr) => {
    const [ruleNumber, ruleBody] = curr.split(': ');
    rules[parseInt(ruleNumber, 10)] = ruleBody;
    return rules;
  }, []);

  const parsedRules = rules.map(rule => {
    if (/"."/.test(rule)) {
      return rule.slice(1, 2);
    }

    return rule.split(' | ').map(sr => sr.split(' ').map(n => parseInt(n, 10)));
  });

  return parsedRules;
};

export const parseInput = (input: string): { rules: Rule[]; messages: string[] } => {
  const [rulesSection, messages] = input.split(/\r?\n\r?\n/);
  const rules = parseRules(rulesSection);
  return {
    rules,
    messages: splitLines(messages),
  };
};

export const resolveRule = (cache: Map<number, string>, rules: Rule[], rule: number): string => {
  if (cache.has(rule)) {
    const cacheRule = cache.get(rule);

    if (cacheRule) {
      return cacheRule;
    }
  }

  const rawRule = rules[rule];

  if (typeof rawRule === 'string') {
    cache.set(rule, rawRule);
    return rawRule;
  }

  const ruleRegex = rawRule
    .map(sr => sr.map(srp => resolveRule(cache, rules, srp)).join(''))
    .join('|');

  cache.set(rule, `(${ruleRegex})`);
  return `(${ruleRegex})`;
};

export class Puzzle202019 extends PuzzleDay {
  part1() {
    const { rules, messages } = parseInput(this.input);
    const ruleZero = resolveRule(new Map<number, string>(), rules, 0);
    const regex = new RegExp(`^${ruleZero}$`);
    const valid = messages.filter(m => regex.test(m));
    return `${valid.length}`;
  }

  part2() {
    const { rules, messages } = parseInput(this.input);
    const cache = new Map<number, string>();
    cache.set(8, `${resolveRule(cache, rules, 42)}+`);
    rules[8] = [[42], [42, 8]];

    rules[11] = [
      [42, 31],
      [42, 42, 31, 31],
      [42, 42, 42, 31, 31, 31],
      [42, 42, 42, 42, 31, 31, 31, 31],
      [42, 42, 42, 42, 42, 31, 31, 31, 31, 31],
    ];

    const ruleZero = resolveRule(cache, rules, 0);
    const regex = new RegExp(`^${ruleZero}$`);
    const valid = messages.filter(m => regex.test(m));
    return `${valid.length}`;
  }
}
