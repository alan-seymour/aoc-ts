import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  const lines = splitLines(input).map(v => parseInt(v, 10));

  return lines;
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

export const findFirstNonSum = (input: number[], lookback: number): number => {
  let index = lookback;
  while (index < input.length) {
    const result = findSum2val(input.slice(index - lookback, index), input[index]);
    if (result.length === 0) {
      return input[index];
    }
    index++;
  }
  throw new Error('not found');
};

export const sumArray = (input: number[]) => input.reduce((total, curr) => total + curr, 0);

export const findContiguousRangeWithSum = (input: number[], goalSum: number): number[] => {
  let leftIndex = 0;
  let rightIndex = 1;
  let sum = sumArray(input.slice(leftIndex, rightIndex));
  while (sum !== goalSum && rightIndex < input.length) {
    if (sum < goalSum) {
      rightIndex++;
    } else {
      leftIndex++;
    }
    sum = sumArray(input.slice(leftIndex, rightIndex));
  }
  return input.slice(leftIndex, rightIndex);
};

export class Puzzle202009 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const result = findFirstNonSum(lines, 25);
    return `${result}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const brokenNumber = findFirstNonSum(lines, 25);
    const range = findContiguousRangeWithSum(lines, brokenNumber);
    const weakness = Math.max(...range) + Math.min(...range);
    return `${weakness}`;
  }
}
