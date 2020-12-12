import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  const values = input.split('-').map(v => parseInt(v, 10));
  return values;
};

const incrementRegex = new RegExp(/^1*2*3*4*5*6*7*8*9*$/);
const minDoubleRegex = new RegExp(/.*(.)\1.*/);
const findGroupsRegex = new RegExp(/(.)\1+/g);

export const numberIncrements = (i: number): boolean =>
  incrementRegex.test(i.toString());

export const hasMinDouble = (i: number): boolean =>
  minDoubleRegex.test(i.toString());

export const hasDouble = (i: number): boolean => {
  const groups = i.toString().match(findGroupsRegex);
  return !!groups?.find(group => group.length === 2);
};

export class Puzzle201904 extends PuzzleDay {
  part1() {
    const [min, max] = parseInput(this.input);
    let count = 0;
    for (let i = min; i <= max; i++) {
      if (numberIncrements(i) && hasMinDouble(i)) {
        count++;
      }
    }
    return `${count}`;
  }

  part2() {
    const [min, max] = parseInput(this.input);
    let count = 0;
    for (let i = min; i <= max; i++) {
      if (numberIncrements(i) && hasDouble(i)) {
        count++;
      }
    }
    return `${count}`;
  }
}
