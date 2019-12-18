import { PuzzleDay } from './puzzleDay';

export const parseInput = (input: string): number[] => {
  return input.split('').map(v => parseInt(v, 10));
};

const pattern = [0, 1, 0, -1];

const getPattern = (index: number, length: number): number[] => {
  let output: number[] = [];
  const repetition = index + 1;
  pattern.forEach(i => {
    const subArray: number[] = new Array(repetition).fill(i);
    output.push(...subArray);
  });
  output = duplicateInput(output, length + 1);
  output.shift();
  return output.slice(0, length);
};

const doCalculation = (input: number[], pattern: number[]): number => {
  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    sum += input[i] * pattern[i];
  }
  return sum;
};

const lazyFind = (offset: number, input: number[]): string => {
  const width = input.length - offset;
  const phasedDigits = input
    .slice(width * -1)
    .map((d: number): number[] => new Array(101).fill(d));

  for (let d = width - 2; d >= 0; d--) {
    for (let phase = 0; phase < 100; phase++) {
      phasedDigits[d][phase + 1] =
        (phasedDigits[d][phase] + phasedDigits[d + 1][phase + 1]) % 10;
    }
  }
  return phasedDigits
    .slice(0, 8)
    .map(d => d.pop())
    .join('');
};

const doPhase = (input: number[]): number[] => {
  const output: number[] = [];
  for (let i = 0; i < input.length; i++) {
    console.log(i);
    const pattern = getPattern(i, input.length);
    const subArray = input.slice(0);
    const sum = doCalculation(subArray, pattern);
    output.push(Math.abs(sum % 10));
  }
  return output;
};

const duplicateInput = (input: number[], length: number): number[] => {
  const output: number[] = [];
  while (output.length < length) {
    output.push(...input);
  }
  return output;
};

const getOffset = (input: string): number => {
  return parseInt(input.substr(0, 7), 10);
};

export class Puzzle201916 extends PuzzleDay {
  part1() {
    let numbers = parseInput(this.input);
    for (let i = 0; i < 100; i++) {
      numbers = doPhase(numbers);
    }
    return `${numbers.slice(0, 8).join('')}`;
  }

  part2() {
    const offset = getOffset(this.input);
    let numbers = parseInput(this.input);

    numbers = duplicateInput(numbers, numbers.length * 10000);
    return lazyFind(offset, numbers);
  }
}
