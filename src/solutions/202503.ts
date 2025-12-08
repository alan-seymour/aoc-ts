import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[][] => {
  const lines = splitLines(input).map(line => line.split('').map(cell => parseInt(cell, 10)));
  return lines;
};

const bankHighest = (bank: number[]): number => {
  const highestFirst = Math.max(...bank.slice(0, -1));
  const highestFirstIndex = bank.indexOf(highestFirst);
  const highestSecond = Math.max(...bank.slice(highestFirstIndex + 1));

  return parseInt(`${highestFirst}${highestSecond}`, 10);
};

const recursiveBankHighest = (bank: number[], remaining: number): number => {
  const highest = Math.max(...bank.slice(0, bank.length - remaining));
  const highestIndex = bank.indexOf(highest);
  if (remaining === 0) {
    return highest;
  }
  const tail = recursiveBankHighest(bank.slice(highestIndex + 1), remaining - 1);
  return parseInt(`${highest}${tail}`, 10);
};

export class Puzzle202503 extends PuzzleDay {
  part1() {
    const banks = parseInput(this.input);
    const sum = banks.reduce((sum, bank) => bankHighest(bank) + sum, 0);
    return `${sum}`;
  }

  part2() {
    const banks = parseInput(this.input);
    const sum = banks.reduce((sum, bank) => recursiveBankHighest(bank, 11) + sum, 0);
    return `${sum}`;
  }
}
