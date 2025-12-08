import { PuzzleDay } from '../puzzleDay';

type Sum = {
  values: number[];
  action: string;
};

export const parseInput = (input: string): string[] => {
  const lines = input.split(/\r?\n/);
  return lines;
};

const linesToSums = (input: string[]): Sum[] => {
  const split = input.map(line => line.trim().split(/\s+/));
  const values = split.slice(0, -1).map(line => line.map(cell => parseInt(cell.trim(), 10)));
  const actions = split.at(-1) ?? [];

  const output: Sum[] = [];

  for (let i = 0; i < values[0].length; i++) {
    output.push({
      action: actions[i].trim(),
      values: values.map(line => line[i]),
    });
  }

  return output;
};

const getNextSum = (input: string[]): [Sum, string[]] => {
  const nextColumnStart = input
    .at(-1)!
    .slice(1)
    .search(/(\*|\+)/);

  const column = input.map(line =>
    line.slice(0, nextColumnStart === -1 ? undefined : nextColumnStart),
  );
  const tail = input.map(line => (nextColumnStart === -1 ? '' : line.slice(nextColumnStart + 1)));

  const sum: Sum = {
    values: [],
    action: column.at(-1)?.[0] ?? '+',
  };

  for (let i = 0; i < column[0].length; i++) {
    const value = parseInt(column.map(l => l[i]).join(''), 10);
    sum.values.push(value);
  }

  return [sum, tail];
};

const doSum = (sum: Sum): number => {
  if (sum.action === '*') {
    return sum.values.reduce((total, value) => total * value, 1);
  }

  return sum.values.reduce((total, value) => total + value, 0);
};

export class Puzzle202506 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const sums = linesToSums(lines);
    const total = sums.reduce((total, sum) => total + doSum(sum), 0);
    return `${total}`;
  }

  part2() {
    let lines = parseInput(this.input);
    const sums: Sum[] = [];
    while (lines.every(line => line.length !== 0)) {
      const next = getNextSum(lines);
      lines = next[1];
      sums.push(next[0]);
    }
    const total = sums.reduce((total, sum) => total + doSum(sum), 0);
    return `${total}`;
  }
}
