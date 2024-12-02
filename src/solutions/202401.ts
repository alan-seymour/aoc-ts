import { zip } from 'lodash';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): [number[], number[]] => {
  const lines = splitLines(input);
  return lines.reduce<[number[], number[]]>
    (([a, b], line) => {
      const [newA, newB] = line.split('   ').map(Number);
      a.push(newA);
      b.push(newB);
      return [a, b];
    },
    [[], []],
  );
};

export class Puzzle202401 extends PuzzleDay {
  part1() {
    const [listA, listB] = parseInput(this.input);
    listA.sort((a,b) => a - b);
    listB.sort((a,b) => a - b);
    const zipped = zip(listA, listB);
    const sumDiffs = zipped.reduce((sum, [a,b]) => sum + (Math.abs((a ?? 0)-(b ?? 0))), 0);
    return `${sumDiffs}`;
  }

  part2() {
    const [listA, listB] = parseInput(this.input);
    const freqs = new Map<number, number>();
    listB.forEach((num) => {
      freqs.set(num, (freqs.get(num) ?? 0) + 1);
    });
    const sums = listA.reduce((sum, num) => sum + ((freqs.get(num) ?? 0) * num), 0);
    return `${sums}`;
  }
}
