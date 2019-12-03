import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

const idToFrequencies = (id: string): Map<string, number> => {
  const frequencies = new Map<string, number>();
  id.split('').forEach(letter => {
    const existing = frequencies.get(letter);
    if (existing) {
      frequencies.set(letter, existing + 1);
    } else {
      frequencies.set(letter, 1);
    }
  });
  return frequencies;
};

type PairOrTrio = {
  pair: boolean;
  trio: boolean;
};

const hasPairOrTrio = (frequencies: Map<string, number>): PairOrTrio => {
  const output = { pair: false, trio: false };

  frequencies.forEach(v => {
    if (v === 2) {
      output.pair = true;
    }
    if (v === 3) {
      output.trio = true;
    }
  });

  return output;
};

const countField = (potA: PairOrTrio[], field: keyof PairOrTrio) =>
  potA.reduce((prev, curr) => {
    if (curr[field]) {
      return prev + 1;
    }
    return prev;
  }, 0);

export const parseInput = (input: string): string[] => {
  return splitLines(input);
};

const sameLetters = (s1: string, s2: string): string[] => {
  const output = [];
  const s1A = s1.split('');
  const s2A = s2.split('');
  for (let i = 0; i < s1A.length; i++) {
    if (s1A[i] === s2A[i]) {
      output.push(s1A[i]);
    }
  }
  return output;
};

export class Puzzle201802 extends PuzzleDay {
  part1() {
    const ids = parseInput(this.input);
    const potA = ids.map(id => hasPairOrTrio(idToFrequencies(id)));
    const pairs = countField(potA, 'pair');
    const trios = countField(potA, 'trio');
    return (pairs * trios).toString();
  }

  part2() {
    // double loop solution
    const ids = parseInput(this.input);
    for (let i = 0; i < ids.length - 1; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const intersection = sameLetters(ids[i], ids[j]);
        if (intersection.length === ids[0].length - 1) {
          return intersection.join('');
        }
      }
    }
    return '';
  }
}
