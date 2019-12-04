import { PuzzleDay } from './puzzleDay';

export const parseInput = (input: string): string[] => {
  const [min, max] = input.split('-');
  return [min, max];
};

type NumberSequence = {
  digit: number;
  length: number;
};

export const numberToSequences = (input: number): NumberSequence[] => {
  const inputA = input
    .toString()
    .split('')
    .map(c => parseInt(c, 10));

  const output: NumberSequence[] = [];

  let counter = 0;
  inputA.reduce((prev, curr, index) => {
    if (prev === curr) {
      counter++;
    } else {
      output.push({ digit: prev, length: counter });
      counter = 1;
    }
    // catch last digit
    if (index === inputA.length - 1) {
      output.push({ digit: curr, length: counter });
    }
    return curr;
  }, 0);

  return output;
};

export const sequencesIncrement = (sequences: NumberSequence[]): boolean => {
  for (let i = 1; i < sequences.length; i++) {
    if (sequences[i].digit < sequences[i - 1].digit) {
      return false;
    }
  }
  return true;
};

export const hasDouble = (sequences: NumberSequence[]): boolean => {
  return sequences.some(s => s.length === 2);
};

export const hasMinDouble = (sequences: NumberSequence[]): boolean => {
  return sequences.some(s => s.length >= 2);
};

export class Puzzle201904 extends PuzzleDay {
  part1() {
    const [min, max] = parseInput(this.input);
    let count = 0;
    for (let i = parseInt(min, 10); i <= parseInt(max, 10); i++) {
      const sequences = numberToSequences(i);
      if (sequencesIncrement(sequences) && hasMinDouble(sequences)) {
        count++;
      }
    }
    return `${count}`;
  }

  part2() {
    const [min, max] = parseInput(this.input);
    let count = 0;
    for (let i = parseInt(min, 10); i <= parseInt(max, 10); i++) {
      const sequences = numberToSequences(i);
      if (sequencesIncrement(sequences) && hasDouble(sequences)) {
        count++;
      }
    }
    return `${count}`;
  }
}
