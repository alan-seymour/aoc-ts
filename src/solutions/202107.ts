import { PuzzleDay } from '../puzzleDay';

type CostFn = (crabLocation: number, desiredLocation: number) => number;

export const parseInput = (input: string): number[] => {
  const values = input.split(',').map((v) => parseInt(v, 10));
  return values;
};

const part1Cost: CostFn = (crabLocation, desiredLocation) =>
  Math.abs(crabLocation - desiredLocation);

const part2Cost: CostFn = (crabLocation, desiredLocation) =>
  [...new Array(Math.abs(crabLocation - desiredLocation)).keys()].reduce(
    (s, c) => s + (c + 1),
    0
  );

const totalCost = (
  crabs: number[],
  desiredLocation: number,
  costFn: CostFn
): number => crabs.reduce((s, c) => s + costFn(c, desiredLocation), 0);

const findOptimalDestinationCost = (
  crabs: number[],
  costFn: CostFn
): number => {
  const mean = Math.round(crabs.reduce((s, c) => s + c, 0) / crabs.length);
  const meanCost = totalCost(crabs, mean, costFn);
  const higherCost = totalCost(crabs, mean + 1, costFn);
  const lowerCost = totalCost(crabs, mean - 1, costFn);
  let stepFn = (target: number) => target + 1;
  let prevCost = meanCost;
  let currCost = meanCost;
  let target = mean;

  if (meanCost < higherCost && meanCost < lowerCost) {
    return meanCost;
  }

  if (meanCost < higherCost) {
    stepFn = (target: number) => target - 1;
  }

  while (prevCost >= currCost) {
    prevCost = currCost;
    target = stepFn(target);
    currCost = totalCost(crabs, target, costFn);
  }

  return prevCost;
};

export class Puzzle202107 extends PuzzleDay {
  part1() {
    const positions = parseInput(this.input);
    const cost = findOptimalDestinationCost(positions, part1Cost);
    return `${cost}`;
  }

  part2() {
    const positions = parseInput(this.input);
    const cost = findOptimalDestinationCost(positions, part2Cost);
    return `${cost}`;
  }
}
