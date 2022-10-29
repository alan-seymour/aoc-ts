import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const lines = splitLines(input);
  return lines;
};

export const decode = (input: string[], initBottom: number, initTop: number): number => {
  let bottom = initBottom;
  let top = initTop;

  input.forEach(c => {
    if (c === 'U') {
      bottom = bottom + Math.ceil((top - bottom) / 2);
    } else {
      top = top - Math.floor((top - bottom) / 2);
    }
  });

  return bottom;
};

export const decodeRow = (input: string): number =>
  decode(input.replace(/F/g, 'L').replace(/B/g, 'U').split(''), 0, 127);

export const decodeCol = (input: string): number =>
  decode(input.replace(/R/g, 'U').split(''), 0, 8);

export const decodeSeats = (input: string): { row: number; col: number } => ({
  row: decodeRow(input.slice(0, -3)),
  col: decodeCol(input.slice(-3)),
});

export const findGap = (ids: number[]) => {
  let prev = ids.shift();
  let next = ids.shift();

  while ((prev ?? 0) + 1 === next) {
    prev = next;
    next = ids.shift();
  }

  return (prev ?? 0) + 1;
};

export class Puzzle202005 extends PuzzleDay {
  part1() {
    const seats = parseInput(this.input).map(decodeSeats);
    const ids = seats.map(s => s.row * 8 + s.col);
    const max = Math.max(...ids);
    return `${max}`;
  }

  part2() {
    const seats = parseInput(this.input).map(decodeSeats);
    const ids = seats.map(s => s.row * 8 + s.col);
    ids.sort((a, b) => a - b);
    const gap = findGap(ids);
    return `${gap}`;
  }
}
