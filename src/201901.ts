import { run, splitLines } from "./helpers";

const inputFile = "./inputs/201901.txt";

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

export const part1 = (input: string) => {
  const masses = parseInput(input);
  return masses.reduce((sum, curr) => sum + massToFuel(curr), 0).toString();
};

export const part2 = (input: string) => {
  const masses = parseInput(input);
  return masses.reduce((sum, curr) => sum + totalFuelMass(curr), 0).toString();
};

if (require.main === module) {
  run(inputFile, [part1, part2]);
}
