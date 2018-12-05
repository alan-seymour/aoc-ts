import { run, splitLines } from './helpers';

const inputFile = './inputs/201801.txt';

export const parseInput = (input: string) => {
  const lines = splitLines(input);
  const numbers = lines.map(line => parseInt(line, 10));
  return numbers;
};

export const part1 = (input: string) => {
  const numbers = parseInput(input);
  return '' + numbers.reduce((p, c) => p + c, 0);
};

export const part2 = (input: string) => {
  const numbers = parseInput(input);
  const seen: Set<number> = new Set([]);
  let runningTotal = 0;
  let index = 0;
  while (!seen.has(runningTotal)) {
    seen.add(runningTotal);
    runningTotal += numbers[index % numbers.length];
    index += 1;
  }
  return '' + runningTotal;
};

if (require.main === module) {
  run(inputFile, [part1, part2]);
}