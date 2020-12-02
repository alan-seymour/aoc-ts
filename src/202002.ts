import { splitLines } from "./helpers";
import { PuzzleDay } from "./puzzleDay";

const inputRegex = /(\d+)-(\d+) (\w): (.*)/;

interface ParsedInput {
  val1: number;
  val2: number;
  char: string;
  pass: string;
}

export const parseInput = (input: string): ParsedInput[] => {
  const lines = splitLines(input);
  const values = lines.map((line) => {
    const [, min, max, char, pass] = line.match(inputRegex) ?? [];
    return {
      val1: parseInt(min, 10),
      val2: parseInt(max, 10),
      char,
      pass,
    };
  });
  return values;
};

export const testPasswordPart1 = (password: ParsedInput): boolean => {
  const count = (password.pass.match(new RegExp(password.char, 'g')) || []).length;
  return count >= password.val1 && count <= password.val2;
};

export const testPasswordPart2 = ({ val1, val2, char, pass }: ParsedInput): boolean => {
  return (((pass.charAt(val1 - 1) === char) && (pass.charAt(val2 - 1) !== char)) || ((pass.charAt(val1 - 1) !== char) && (pass.charAt(val2 - 1) === char)));
};

export class Puzzle202002 extends PuzzleDay {
  part1() {
    const values = parseInput(this.input);
    const valid = values.filter(testPasswordPart1);
    return `${valid.length}`;
  }

  part2() {
    const values = parseInput(this.input);
    const valid = values.filter(testPasswordPart2);
    return `${valid.length}`;
  }
}
