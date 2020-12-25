import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): [number, number] => {
  const [card, door] = splitLines(input).map((v) => parseInt(v, 10));
  return [card, door];
};

const doIteration = (value: number, subject: number): number => {
  value = value * subject;
  value = value % 20201227;
  return value;
};

const findLoopSizes = (
  subject: number,
  [card, door]: [number, number]
): [number, number] => {
  let i = 0;
  let value = 1;
  let doorLoopSize: number | undefined = undefined;
  let cardLoopSize: number | undefined = undefined;
  while (!doorLoopSize || !cardLoopSize) {
    i++;
    value = doIteration(value, subject);
    if (value === card && !cardLoopSize) {
      cardLoopSize = i;
    }
    if (value === door && !doorLoopSize) {
      doorLoopSize = i;
    }
  }
  return [cardLoopSize, doorLoopSize];
};

const doLoops = (subject: number, loopCount: number): number => {
  let value = 1;
  for (let i = 0; i < loopCount; i++) {
    value = doIteration(value, subject);
  }
  return value;
};

export class Puzzle202025 extends PuzzleDay {
  part1() {
    const [cardPk, doorPk] = parseInput(this.input);
    const [cardLoop, doorLoop] = findLoopSizes(7, [cardPk, doorPk]);
    const value = doLoops(cardPk, doorLoop);
    return `${value}`;
  }

  part2() {
    const lines = parseInput(this.input);
    return ``;
  }
}
