import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Range = {
  min: bigint;
  max: bigint;
};

type DataPoint = {
  data: bigint;
  type: 'min' | 'max';
};

export const parseInput = (input: string): { freshRanges: Range[]; food: bigint[] } => {
  const lines = splitLines(input);
  let nextLine = lines.shift();
  const freshRanges: Range[] = [];

  while (nextLine && nextLine.trim() !== '') {
    const [min, max] = nextLine.split('-');
    freshRanges.push({ min: BigInt(min), max: BigInt(max) });
    nextLine = lines.shift();
  }

  const food: bigint[] = lines.map(line => BigInt(line));

  return { freshRanges, food };
};

const countTotalRange = (ranges: Range[]): bigint => {
  const dataPoints: DataPoint[] = ranges.flatMap(r => [
    {
      data: r.min,
      type: 'min',
    },
    {
      data: r.max,
      type: 'max',
    },
  ]);

  dataPoints.sort((a, b) => {
    if (a.data > b.data) {
      return 1;
    } else if (a.data < b.data) {
      return -1;
    }

    if (a.type === 'min' && b.type === 'min') {
      return 0;
    } else if (a.type === 'min') {
      return -1;
    }

    return 1;
  });

  const { total } = dataPoints.reduce<{ depth: number; rangeStart: bigint; total: bigint }>(
    ({ depth, rangeStart, total }, dataPoint) => {
      if (dataPoint.type === 'min') {
        if (depth === 0) {
          rangeStart = dataPoint.data;
        }
        depth++;
      } else {
        depth--;
        if (depth === 0) {
          total += dataPoint.data - rangeStart + 1n;
        }
      }

      return { depth, rangeStart, total };
    },
    { depth: 0, rangeStart: 0n, total: 0n },
  );

  return total;
};

export class Puzzle202505 extends PuzzleDay {
  part1() {
    const { freshRanges, food } = parseInput(this.input);
    const freshFood = food.filter(foodItem =>
      freshRanges.some(range => range.min <= foodItem && range.max >= foodItem),
    );
    return `${freshFood.length}`;
  }

  part2() {
    const { freshRanges, food } = parseInput(this.input);
    const totalFresh = countTotalRange(freshRanges);
    return `${totalFresh}`;
  }
}
