import { splitLines, modInverse } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Input = {
  earliest: number;
  buses: string[];
};

export const parseInput = (input: string): Input => {
  const lines = splitLines(input);

  const timetable = {
    earliest: parseInt(lines[0], 10),
    buses: lines[1].split(','),
  };

  return timetable;
};

type Pair = {
  value: bigint;
  index: bigint;
};

const isPair = (v: string | Pair): v is Pair =>
  typeof v === 'object' && typeof v.index === 'bigint' && typeof v.value === 'bigint';

const chineseRemainder = (buses: string[]): bigint => {
  const numericalBuses = buses
    .map((v, i) => (Number(v) ? { value: BigInt(v), index: BigInt(i) } : 'x'))
    .filter(isPair);

  const product = numericalBuses.reduce((product, curr) => product * curr.value, 1n);

  const multipliers = numericalBuses.map(({ value }) => product / value);

  const offsets = numericalBuses.map(({ value, index }, i) => (i === 0 ? 0n : value - index));

  const inverseMods = numericalBuses.map(({ value }, i) => modInverse(multipliers[i], value));

  const coefficients = multipliers.map((item, i) => item * offsets[i] * inverseMods[i]);

  const sum = coefficients.reduce((acc, cur) => acc + cur);

  return sum - (sum / product) * product;
};

export class Puzzle202013 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const activeBuses = input.buses.map(v => parseInt(v, 10)).filter(Boolean);

    const distanceFromEarliest = activeBuses.map(v => ({
      firstOne: v - (input.earliest % v),
      busId: v,
    }));

    distanceFromEarliest.sort((a, b) => a.firstOne - b.firstOne);
    const first = distanceFromEarliest.shift() ?? { busId: 0, firstOne: 0 };
    return `${first.busId * first.firstOne}`;
  }

  part2() {
    const input = parseInput(this.input);
    const answer = chineseRemainder(input.buses);
    return `${answer}`;
  }
}
