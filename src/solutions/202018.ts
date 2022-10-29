import { exit, number } from 'yargs';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][] => {
  const lines = splitLines(input).map(l => l.split(' ').join('').split(''));
  return lines;
};

const solveBracketsPart1 = (equation: string[]): number => {
  const { total } = equation.reduce(
    ({ operation, total }, curr) => {
      if (parseInt(curr, 10)) {
        if (operation === '*') {
          return { operation, total: parseInt(curr, 10) * total };
        } else if (operation === '+') {
          return { operation, total: parseInt(curr) + total };
        }

        return { operation, total: parseInt(curr, 10) };
      } else {
        return { operation: curr, total };
      }
    },
    { operation: '', total: 0 },
  );

  return total;
};

const solveBracketsPart2 = (equation: string[]): number => {
  let newEquation = equation;
  let plusIndex = newEquation.findIndex(e => e === '+');

  while (plusIndex !== -1) {
    const lhs = newEquation[plusIndex - 1];
    const rhs = newEquation[plusIndex + 1];
    const result = parseInt(lhs, 10) + parseInt(rhs, 10);

    newEquation = [
      ...newEquation.slice(0, plusIndex - 1),
      result.toString(),
      ...newEquation.slice(plusIndex + 2),
    ];

    plusIndex = newEquation.findIndex(e => e === '+');
  }

  let multIndex = newEquation.findIndex(e => e === '*');

  while (multIndex !== -1) {
    const lhs = newEquation[multIndex - 1];
    const rhs = newEquation[multIndex + 1];
    const result = parseInt(lhs, 10) * parseInt(rhs, 10);

    newEquation = [
      ...newEquation.slice(0, multIndex - 1),
      result.toString(),
      ...newEquation.slice(multIndex + 2),
    ];

    multIndex = newEquation.findIndex(e => e === '*');
  }

  return parseInt(newEquation[0], 10);
};

type BracketSolver = (input: string[]) => number;

const solveEquation = (equation: string[], bracketSolver: BracketSolver): number => {
  let newEquation = equation;

  while (newEquation.some(c => c === '(')) {
    let openingIndex = 0;

    for (let i = 0; i < newEquation.length; i++) {
      if (newEquation[i] === '(') {
        openingIndex = i;
      }

      if (newEquation[i] === ')') {
        const subValue = bracketSolver(newEquation.slice(openingIndex + 1, i));

        newEquation = [
          ...newEquation.slice(0, openingIndex),
          subValue.toString(),
          ...newEquation.slice(i + 1),
        ];

        break;
      }
    }
  }

  return bracketSolver(newEquation);
};

export class Puzzle202018 extends PuzzleDay {
  part1() {
    const equations = parseInput(this.input);
    const results = equations.map(e => solveEquation(e, solveBracketsPart1));
    const total = results.reduce((sum, curr) => sum + curr, 0);
    return `${total}`;
  }

  part2() {
    const equations = parseInput(this.input);
    const results = equations.map(e => solveEquation(e, solveBracketsPart2));
    const total = results.reduce((sum, curr) => sum + curr, 0);
    return `${total}`;
  }
}
