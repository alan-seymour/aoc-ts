import { PuzzleDay } from '../puzzleDay';

type Counts = { [key: string]: number };

export const parseInput = (input: string): Counts => {
  const values = input.split(',').map((v) => parseInt(v, 10));
  return values.reduce<Counts>(
    (c, v) => ({
      ...c,
      [v]: (c[v] ?? 0) + 1,
    }),
    {}
  );
};

const dayStep = (fishCounts: Counts): Counts =>
  Object.entries(fishCounts).reduce<Counts>((c, [k, v]) => {
    const output = { ...c };
    const ki = parseInt(k, 10);
    if (ki === 0) {
      output[6] = (output[6] ?? 0) + v;
      output[8] = v;
    } else {
      output[ki - 1] = (output[ki - 1] ?? 0) + v;
    }

    return output;
  }, {});

const sum = (fishCounts: Counts): number =>
  Object.values(fishCounts).reduce((s, c) => s + c, 0);

export class Puzzle202106 extends PuzzleDay {
  part1() {
    let fishCounts = parseInput(this.input);

    for (let i = 0; i < 80; i++) {
      fishCounts = dayStep(fishCounts);
    }

    const total = sum(fishCounts);

    return `${total}`;
  }

  part2() {
    let fishCounts = parseInput(this.input);

    for (let i = 0; i < 256; i++) {
      fishCounts = dayStep(fishCounts);
    }

    const total = sum(fishCounts);

    return `${total}`;
  }
}
