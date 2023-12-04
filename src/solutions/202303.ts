import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Part = {
  symbol: string;
  position: {
    i: number;
    j: number;
  };
};

type PartNumber = {
  number: number;
  part: Part;
};

export const parseInput = (input: string): string[][] => {
  const schematic = splitLines(input).map(line => line.split(''));
  return schematic;
};

const findNearbySymbol = (
  schematic: string[][],
  row: number,
  startPos: number,
  endPos: number,
): Part | null => {
  for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, schematic.length - 1); i++) {
    for (let j = Math.max(startPos - 1, 0); j <= Math.min(endPos + 1, schematic[0].length); j++) {
      if (schematic[i][j]?.match(/([^\d.])/i)) {
        return {
          symbol: schematic[i][j],
          position: {
            i,
            j,
          },
        };
      }
    }
  }

  return null;
};

const findPartNumbers = (schematic: string[][]): PartNumber[] => {
  const numbers: PartNumber[] = [];

  let currentNumber = '';
  let startPos = 0;

  for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic[0].length; j++) {
      const number = Number(schematic[i][j]);

      if (!Number.isNaN(number)) {
        if (currentNumber === '') {
          // just found start of number
          startPos = j;
        }

        currentNumber = currentNumber + schematic[i][j];
      } else if (currentNumber !== '') {
        // just finished a number
        const nearbySymbol = findNearbySymbol(schematic, i, startPos, j - 1);

        if (nearbySymbol !== null) {
          numbers.push({ number: Number(currentNumber), part: nearbySymbol });
        }

        currentNumber = '';
      }
    }

    if (currentNumber !== '') {
      // if a number ended at the end of the line
      const nearbySymbol = findNearbySymbol(schematic, i, startPos, schematic[0].length - 1);

      if (nearbySymbol !== null) {
        numbers.push({ number: Number(currentNumber), part: nearbySymbol });
      }

      currentNumber = '';
    }
  }

  return numbers;
};

const isPotentialGear = (number: PartNumber): boolean => number.part.symbol === '*';

const getGearNumbers = (potentials: PartNumber[]): Map<string, number[]> => {
  const gears = new Map<string, number[]>();

  potentials.forEach(p => {
    const hash = `${p.part.position.i};${p.part.position.j}`;
    const existing = gears.get(hash) ?? [];
    gears.set(hash, [...existing, p.number]);
  });

  return gears;
};

const filterAndRatioGears = (gears: Map<string, number[]>): number[] =>
  Array.from(gears.values())
    .filter(n => n.length === 2)
    .map(r => r[0] * r[1]);

export class Puzzle202303 extends PuzzleDay {
  part1() {
    const schematic = parseInput(this.input);
    const partNumbers = findPartNumbers(schematic);

    const sum = partNumbers.reduce((sum, curr) => sum + curr.number, 0);
    return `${sum}`;
  }

  part2() {
    const schematic = parseInput(this.input);
    const partNumbers = findPartNumbers(schematic);
    const potentialGears = partNumbers.filter(isPotentialGear);
    const gearNumbers = getGearNumbers(potentialGears);
    const gearRatios = filterAndRatioGears(gearNumbers);
    const sum = gearRatios.reduce((sum, curr) => sum + curr, 0);

    return `${sum}`;
  }
}
