import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string) => {
  const lines = splitLines(input);
  const numbers = lines.map((line) => parseInt(line, 10));
  return numbers;
};

const findSum2val = (input: number[], target: number): number[] => {
  input.sort((a, b) => a - b);
  let leftIndex = 0;
  let rightIndex = input.length - 1;

  while (leftIndex < rightIndex) {
    const sum = input[leftIndex] + input[rightIndex];
    if (sum < target) {
      leftIndex++;
    } else if (sum > target) {
      rightIndex--;
    } else {
      return [input[leftIndex], input[rightIndex]];
    }
  }
  return [];
};

const findSum3val = (input: number[], target: number): number[] => {
  input.sort((a, b) => a - b);
  let leftIndex = 0;
  let middleIndex = 1;
  let rightIndex = input.length - 1;

  for (leftIndex = 0; leftIndex < input.length - 2; leftIndex++) {
    middleIndex = leftIndex + 1;
    rightIndex = input.length - 1;
    while (middleIndex < rightIndex) {
      const sum = input[leftIndex] + input[middleIndex] + input[rightIndex];
      if (sum < target) {
        middleIndex++;
      } else if (sum > target) {
        rightIndex--;
      } else {
        return [input[leftIndex], input[middleIndex], input[rightIndex]];
      }
    }
  }

  return [];
};

export class Puzzle202001 extends PuzzleDay {
  part1() {
    const values = parseInput(this.input);
    const matchingValues = findSum2val(values, 2020);
    return (matchingValues[0] * matchingValues[1]).toString();
  }

  part2() {
    const values = parseInput(this.input);
    const matchingValues = findSum3val(values, 2020);
    return (matchingValues[0] * matchingValues[1] * matchingValues[2]).toString();
  }
}
