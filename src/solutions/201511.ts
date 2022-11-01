import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => input.trim().split('');

const chars = 'abcdefghjkmnpqrstuvwxyz'.split('');

const incrementPassword = (input: number[]): number[] =>
  input.reverse().reduce<number[]>((c, n) => {
    if (c[0] && c[0] >= 23) {
      c[0] = 0;
      c.unshift(n + 1);
    } else if (c.length === 0) {
      c.unshift(n + 1);
    } else {
      c.unshift(n);
    }

    // console.log(c);

    return c;
  }, []);

const validatePassword = (input: number[]): boolean => {
  const firstDoublePos = findDouble(input);

  if (firstDoublePos === null) {
    return false;
  }

  const secondDoublePos = findDouble(input.slice(firstDoublePos + 1));

  if (secondDoublePos === null) {
    return false;
  }

  return hasTripleIncrement(input);
};

const hasTripleIncrement = (input: number[]): boolean => {
  for (let i = 2; i < input.length; i++) {
    if (input[i] - 1 === input[i - 1] && input[i] - 2 === input[i - 2]) {
      return true;
    }
  }

  return false;
};

const findDouble = (input: number[]): number | null => {
  if (input.length === 0) {
    return null;
  }

  let i = 1;

  while (input[i - 1] !== input[i] && i <= input.length) {
    if (i === input.length) {
      return null;
    }

    i++;
  }

  return i;
};

export class Puzzle201511 extends PuzzleDay {
  part1() {
    const characters = parseInput(this.input);
    let pass = characters.map(c => chars.indexOf(c));
    pass = incrementPassword(pass);

    while (!validatePassword(pass)) {
      pass = incrementPassword(pass);
    }

    const stringed = pass.map(n => chars[n]);
    return stringed.join('');
  }

  part2() {
    const characters = parseInput(this.input);
    let pass = characters.map(c => chars.indexOf(c));
    pass = incrementPassword(pass);

    while (!validatePassword(pass)) {
      pass = incrementPassword(pass);
    }

    pass = incrementPassword(pass);

    while (!validatePassword(pass)) {
      pass = incrementPassword(pass);
    }

    const stringed = pass.map(n => chars[n]);
    return stringed.join('');
  }
}
