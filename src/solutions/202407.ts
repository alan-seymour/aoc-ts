import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Equation = {
  testValue: number;
  values: number[];
}

type Operators = '*' | '+' | '||';

export const parseInput = (input: string): Equation[] => {
  const equations = splitLines(input).map(line => {
    const [testValue, values] = line.split(': ');
    return {
      testValue: parseInt(testValue, 10),
      values: values.split(' ').map(v => parseInt(v, 10))
    };
  });
  return equations;
};

const evaluateEquation = (equation: Equation, operators: Operators[]): boolean => {
  const queue = [equation.values];
  let found = false;

  while (queue.length > 0 && !found) {
    const state = queue.shift() ?? [];

    if (state.length === 1) {
      if (state[0] === equation.testValue) {
        found = true;
      }
      continue;
    }

    const total = state[0] ?? 0;

    const nextValue = state[1] ?? 0;

    operators.forEach(op => {
      let result = total;

      if (op === '+') {
        result = result + nextValue;
      } else if (op === '*'){
        result = result * nextValue;
      } else if (op === '||') {
        result = parseInt(""+total+nextValue, 10);
      }

      if (result <= equation.testValue) {
        queue.push([result, ...(state.slice(2))]);
      }
    });
  }

  return found;
}

export class Puzzle202407 extends PuzzleDay {
  part1() {
    const equations = parseInput(this.input);
    const operators: Operators[] = ['+', '*'];
    const valid = equations.filter(equation => evaluateEquation(equation, operators));
    const sum = valid.reduce((acc, cur) => acc + cur.testValue, 0);
    return `${sum}`;
  }

  part2() {
    const equations = parseInput(this.input);
    const operators: Operators[] = ['+', '*', '||'];
    const valid = equations.filter(equation => evaluateEquation(equation, operators));
    const sum = valid.reduce((acc, cur) => acc + cur.testValue, 0);
    return `${sum}`;
  }
}
