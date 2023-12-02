import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const lines = splitLines(input);
  return lines;
};

const stripLetters = (lines: string[]): number[][] =>
  lines.map(l => l.split('').map(Number).filter(Boolean));

const concatFirstAndLast = (numbers: number[][]): number[] =>
  numbers.map(n => Number(`${n[0]}${n.at(-1)}`));

type WordNumber =
  | 'one'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'zero'
  | 'oneight'
  | 'twone'
  | 'threeight'
  | 'fiveight'
  | 'sevenine'
  | 'eightwo'
  | 'eighthree'
  | 'nineight'
  | 'zerone';

const lettersToDigits: Record<WordNumber, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
  zero: '0',
  oneight: '18',
  twone: '21',
  threeight: '38',
  fiveight: '58',
  sevenine: '79',
  eightwo: '82',
  eighthree: '83',
  nineight: '98',
  zerone: '01',
};

const isWordNumber = (input: string): input is WordNumber =>
  Object.keys(lettersToDigits).some(l => l === input);

const replaceLetters = (lines: string[]): string[] =>
  lines.map(v =>
    v.replaceAll(
      new RegExp(Object.keys(lettersToDigits).reverse().join('|'), 'gi'),
      (input: string) => {
        if (isWordNumber(input)) {
          return lettersToDigits[input];
        }

        return input;
      },
    ),
  );

export class Puzzle202301 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const numbers = stripLetters(lines);
    const concat = concatFirstAndLast(numbers);
    const sum = concat.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const replaced = replaceLetters(lines);
    const numbers = stripLetters(replaced);
    const concat = concatFirstAndLast(numbers);
    const sum = concat.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }
}
