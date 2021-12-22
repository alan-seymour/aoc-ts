import { mergeWith } from 'lodash';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): [string[], Map<string, string>] => {
  const lines = splitLines(input);
  const start = lines.shift()?.split('') ?? [];
  lines.shift();
  const rules = new Map<string, string>();

  lines.forEach((l) => {
    const [, key, value] = l.match(/(.*) -> (.*)/) ?? [];
    rules.set(key, value);
  });

  return [start, rules];
};

const calcFrequencies = (chain: string[]): { [key: string]: number } =>
  chain.reduce<{ [key: string]: number }>(
    (f, c) => ({ ...f, [c]: (f[c] ?? 0) + 1 }),
    {}
  );

const cache = new Map<string, { [key: string]: number }>();

const getFreqs = (
  rules: Map<string, string>,
  left: string,
  right: string,
  depth: number,
  maxDepth: number
): { [key: string]: number } => {
  const cacheKey = `${left}${right}${depth}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) ?? {};
  }

  if (depth === maxDepth) {
    return {};
  }
  const insert = rules.get(`${left}${right}`) ?? '';
  const leftFreqs = getFreqs(rules, left, insert, depth + 1, maxDepth);
  const rightFreqs = getFreqs(rules, insert, right, depth + 1, maxDepth);
  const currentFreqs = { [insert]: 1 };

  const output = mergeWith(
    {},
    currentFreqs,
    leftFreqs,
    rightFreqs,
    (obj, src) => (obj ?? 0) + (src ?? 0)
  );

  cache.set(cacheKey, output);

  return output;
};

const getTotalFreqs = (
  rules: Map<string, string>,
  maxDepth: number,
  starting: string[]
): { [key: string]: number } => {
  let output: { [key: string]: number } = {};
  for (let i = 0; i < starting.length - 1; i++) {
    const freqs = getFreqs(rules, starting[i], starting[i + 1], 0, maxDepth);
    const currentFreq = { [starting[i]]: 1 };
    output = mergeWith(
      {},
      output,
      freqs,
      currentFreq,
      (obj, src) => (obj ?? 0) + (src ?? 0)
    );
  }

  const last = { [starting[starting.length - 1]]: 1 };
  output = mergeWith({}, output, last, (obj, src) => (obj ?? 0) + (src ?? 0));

  return output;
};

export class Puzzle202114 extends PuzzleDay {
  part1() {
    cache.clear();
    const [start, rules] = parseInput(this.input);
    const freqs = getTotalFreqs(rules, 10, start);
    const values = Object.values(freqs).sort((a, b) => a - b);
    const total = values[values.length - 1] - values[0];
    return `${total}`;
  }

  part2() {
    cache.clear();
    const [start, rules] = parseInput(this.input);
    const freqs = getTotalFreqs(rules, 40, start);
    const values = Object.values(freqs).sort((a, b) => a - b);
    const total = values[values.length - 1] - values[0];
    return `${total}`;
  }
}
