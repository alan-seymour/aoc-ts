import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

export const parseInput = (input: string) => {
  const lines = splitLines(input);
  const numbers = lines.map(line => parseInt(line, 10));
  return numbers;
};

const massToFuel = (mass: number): number => Math.floor(mass / 3) - 2;

const totalFuelMass = (mass: number): number => {
  let prevFuel = massToFuel(mass);
  let totalFuel = 0;
  while (prevFuel > 0) {
    totalFuel += prevFuel;
    prevFuel = massToFuel(prevFuel);
  }
  return totalFuel;
};

export class Puzzle201901 extends PuzzleDay {
  part1() {
    const masses = parseInput(this.input);
    return masses.reduce((sum, curr) => sum + massToFuel(curr), 0).toString();
  }

  part2() {
    const masses = parseInput(this.input);
    return masses
      .reduce((sum, curr) => sum + totalFuelMass(curr), 0)
      .toString();
  }
}
