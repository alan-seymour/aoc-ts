import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Row = {
  layout: string[];
  numeric: number[];
};

export const parseInput = (input: string): Row[] => {
  const lines = splitLines(input).map(l => {
    const [layoutString, numericString] = l.split(' ');
    return {
      layout: layoutString.split(''),
      numeric: numericString.split(',').map(c => Number(c)),
    };
  });

  return lines;
};

const cache = new Map<string, number>();

const findArrangements = ({ layout, numeric }: Row): number => {
  const key = `${layout.join('')}|${numeric.join(',')}`;

  if (cache.has(key)) {
    return cache.get(key) ?? 0;
  }

  if (layout.length === 0) {
    // reached end of layout, if no more numerics then it's a valid arrangement
    return numeric.length ? 0 : 1;
  }

  if (numeric.length === 0) {
    // reached end of numerics, if no more broken, then it's a valid arrangement
    return layout.includes('#') ? 0 : 1;
  }

  let result = 0;
  const nextCell = layout[0];

  if (nextCell === '.' || nextCell === '?') {
    // next range might not start here
    result += findArrangements({ layout: layout.slice(1), numeric });
  }

  const [nextNumeric, ...rest] = numeric;

  if (nextCell === '#' || nextCell === '?') {
    if (
      // make sure the next range fits
      nextNumeric <= layout.length &&
      // make sure there aren't any working in the range
      layout.slice(0, nextNumeric).every(l => l !== '.') &&
      // make sure that either this is the last section, or this range doesn't end in a broken
      (nextNumeric === layout.length || layout[nextNumeric] !== '#')
    ) {
      result += findArrangements({ layout: layout.slice(nextNumeric + 1), numeric: rest });
    }
  }

  cache.set(key, result);
  return result;
};

const unfold = ({ layout, numeric }: Row): Row => ({
  layout: [...layout, '?', ...layout, '?', ...layout, '?', ...layout, '?', ...layout],
  numeric: [...numeric, ...numeric, ...numeric, ...numeric, ...numeric],
});

export class Puzzle202312 extends PuzzleDay {
  part1() {
    const rows = parseInput(this.input);
    const arrangements = rows.map(r => findArrangements(r));
    const sum = arrangements.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }

  part2() {
    const rows = parseInput(this.input);
    const unfolded = rows.map(row => unfold(row));
    const arrangements = unfolded.map(r => findArrangements(r));
    const sum = arrangements.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }
}
