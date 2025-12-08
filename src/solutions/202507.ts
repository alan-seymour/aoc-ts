import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][] => {
  const lines = splitLines(input).map(line => line.split(''));
  return lines;
};

const evaluateRow = (row: string[], beams: boolean[]): [boolean[], number] => {
  let splits = 0;
  const output: boolean[] = new Array(row.length).fill(false);
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '.' && beams[i]) {
      output[i] = true;
    } else if (row[i] === '^' && beams[i]) {
      output[i - 1] = true;
      output[i + 1] = true;
      splits++;
    }
  }

  return [output, splits];
};

const createFirstBeamRow = (row: string[]): boolean[] => {
  const beams = new Array(row.length).fill(false);
  const start = row.indexOf('S');
  beams[start] = true;

  return beams;
};

const countPathsLinear = (row: string[], beams: number[]): number[] => {
  const output: number[] = new Array(row.length).fill(0);

  for (let i = 0; i < row.length; i++) {
    if (row[i] === '.') {
      output[i] = output[i] + beams[i];
    } else if (row[i] === '^' && beams[i] > 0) {
      output[i - 1] = output[i - 1] + beams[i];
      output[i + 1] = output[i + 1] + beams[i];
    }
  }

  return output;
};

export class Puzzle202507 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    let beams = createFirstBeamRow(lines[0]);
    let splits = 0;
    for (let i = 1; i < lines.length; i++) {
      const rowEval = evaluateRow(lines[i], beams);
      splits += rowEval[1];
      beams = rowEval[0];
    }
    return `${splits}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const startingColumn = lines[0].indexOf('S');
    let beams = new Array(lines[0].length).fill(0);
    beams[startingColumn] = 1;
    for (let i = 1; i < lines.length; i++) {
      beams = countPathsLinear(lines[i], beams);
    }
    const pathCount = beams.reduce((sum, col) => sum + col, 0);
    return `${pathCount}`;
  }
}
