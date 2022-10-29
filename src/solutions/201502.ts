import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[][] => {
  const boxes = splitLines(input).map(line => line.split('x').map(n => parseInt(n, 10)));
  return boxes;
};

const calcBoxRequirement = (box: number[]): number => {
  const [l, w, h] = box;

  const totalArea = 2 * l * w + 2 * w * h + 2 * h * l;
  const slack = Math.min(l * w, w * h, l * h);

  return totalArea + slack;
};

const calcRibbonRequirement = (box: number[]): number => {
  const [l, w, h] = box;

  const bow = l * w * h;
  const ribbon = Math.min(2 * l + 2 * w, 2 * w + 2 * h, 2 * l + 2 * h);

  return bow + ribbon;
};

export class Puzzle201502 extends PuzzleDay {
  part1() {
    const boxes = parseInput(this.input);
    const total = boxes.map(b => calcBoxRequirement(b)).reduce((c, i) => c + i, 0);
    return `${total}`;
  }

  part2() {
    const boxes = parseInput(this.input);
    const total = boxes.map(b => calcRibbonRequirement(b)).reduce((c, i) => c + i, 0);
    return `${total}`;
  }
}
