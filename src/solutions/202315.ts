import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const steps = splitLines(input)[0].split(',');

  return steps;
};

const hashLabel = (step: string): number =>
  step
    .split('')
    .reduce<number>((current, charStr) => ((current + charStr.charCodeAt(0)) * 17) % 256, 0);

const processStep = (
  step: string,
  hashmap: Map<number, { label: string; value: number }[]>,
): Map<number, { label: string; value: number }[]> => {
  if (step.includes('=')) {
    const [label, value] = step.split('=');
    const labelHash = hashLabel(label);
    let existingArray = hashmap.get(labelHash) ?? [];
    const index = existingArray.findIndex(l => l.label === label);

    if (index !== -1) {
      existingArray[index] = { label, value: Number(value) };
    } else {
      existingArray = [...existingArray, { label, value: Number(value) }];
    }

    hashmap.set(labelHash, existingArray);
  } else {
    const label = step.slice(0, -1);
    const labelHash = hashLabel(label);
    const existingArray = hashmap.get(labelHash) ?? [];
    const filtered = existingArray.filter(l => l.label !== label);
    hashmap.set(labelHash, filtered);
  }

  return hashmap;
};

const sumLenses = (hashmap: Map<number, { label: string; value: number }[]>): number =>
  Array.from(hashmap.entries()).reduce(
    (sum, [boxNumber, boxContents]) =>
      boxContents.reduce((boxSum, lens, i) => (boxNumber + 1) * (i + 1) * lens.value + boxSum, 0) +
      sum,
    0,
  );

export class Puzzle202315 extends PuzzleDay {
  part1() {
    const steps = parseInput(this.input);
    const hashes = steps.map(step => hashLabel(step));
    const sum = hashes.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }

  part2() {
    const steps = parseInput(this.input);

    const processed = steps.reduce<Map<number, { label: string; value: number }[]>>(
      (hashmap, step) => processStep(step, hashmap),
      new Map(),
    );

    const sums = sumLenses(processed);
    return `${sums}`;
  }
}
