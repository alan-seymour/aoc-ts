import { exit, number } from 'yargs';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][] => {
  const lines = splitLines(input).map(l => l.split(' ').join('').split(''));
  return lines;
};

const solveBracketsPart1 = (equation: string[]): number => {
  const { total } = equation.reduce(({ operation, total }, curr) => {
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
  }, { operation: '', total: 0 });
  return total;
};

const solveBracketsPart2 = (equation: string[]): number => {
  let plusIndex = equation.findIndex(e => e === '+');
  while (plusIndex !== -1) {
    const lhs = equation[plusIndex - 1];
    const rhs = equation[plusIndex + 1];
    const result = parseInt(lhs, 10) + parseInt(rhs, 10);
    equation = [...equation.slice(0, plusIndex - 1), result.toString(), ...equation.slice(plusIndex + 2)];
    plusIndex = equation.findIndex(e => e === '+');
  }

  let multIndex = equation.findIndex(e => e === '*');
  while (multIndex !== -1) {
    const lhs = equation[multIndex - 1];
    const rhs = equation[multIndex + 1];
    const result = parseInt(lhs, 10) * parseInt(rhs, 10);
    equation = [...equation.slice(0, multIndex - 1), result.toString(), ...equation.slice(multIndex + 2)];
    multIndex = equation.findIndex(e => e === '*');
  }

  return parseInt(equation[0], 10);
};

type BracketSolver = (input: string[]) => number;

const solveEquation = (equation: string[], bracketSolver: BracketSolver): number => {
  while (equation.some(c => c === '(')) {
    let openingIndex = 0;
    for (let i = 0; i < equation.length; i++) {
      if (equation[i] === '(') {
        openingIndex = i;
      }
      if (equation[i] === ')') {
        const subValue = bracketSolver(equation.slice(openingIndex + 1, i));
        equation = [...equation.slice(0, openingIndex), subValue.toString(), ...equation.slice(i + 1)];
        break;
      }
    }
  }
  return bracketSolver(equation);
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
