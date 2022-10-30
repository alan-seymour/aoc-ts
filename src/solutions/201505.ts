import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const lines = splitLines(input);
  return lines;
};

const countVowels = (line: string): number =>
  line.split('').filter(c => c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u').length;

const hasDouble = (line: string): boolean =>
  line.split('').reduce((prev, curr, i) => prev || curr === (line[i - 1] ?? ''), false);

const hasForbidden = (line: string): boolean => line.match(/(ab)|(cd)|(pq)|(xy)/) !== null;

const hasDoublePair = (line: string): boolean =>
  line.split('').reduce(
    ({ pairs, found }, curr, i) => {
      if (found) {
        return { pairs, found };
      }

      const pair = `${line[i - 1] ?? ''}${curr}`;

      if (pair.length > 1) {
        if (pairs.has(pair) && (pairs.get(pair) ?? -3) < i - 1) {
          return { pairs, found: true };
        } else {
          pairs.set(pair, i);
        }
      }

      return { pairs, found };
    },
    { pairs: new Map<string, number>(), found: false },
  ).found;

const hasSkipDouble = (line: string): boolean =>
  line.split('').reduce((prev, curr, i) => prev || curr === (line[i - 2] ?? ''), false);

export class Puzzle201505 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);

    const nice = lines.filter(
      line => countVowels(line) >= 3 && hasDouble(line) && !hasForbidden(line),
    );

    return `${nice.length}`;
  }

  part2() {
    const lines = parseInput(this.input);

    const nice = lines.filter(line => hasDoublePair(line) && hasSkipDouble(line));

    return `${nice.length}`;
  }
}
