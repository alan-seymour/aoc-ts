import { permutator, splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): Map<string, Map<string, number>> => {
  const distances = new Map<string, Map<string, number>>();

  splitLines(input).forEach(line => {
    const [, from, to, distance] = line.match(/(.+) to (.+) = (\d+)/) ?? [];

    const intDistance = parseInt(distance, 10);

    const existingFrom = distances.get(from) ?? new Map<string, number>();
    const existingTo = distances.get(to) ?? new Map<string, number>();

    existingFrom.set(to, intDistance);
    existingTo.set(from, intDistance);

    distances.set(from, existingFrom);
    distances.set(to, existingTo);
  });

  return distances;
};

const calcTotalDistance = (
  locations: string[],
  lengths: Map<string, Map<string, number>>,
): number =>
  locations
    .slice(1)
    .reduce(
      (distance, location, i) => distance + (lengths.get(location)?.get(locations[i]) ?? 0),
      0,
    );

export class Puzzle201509 extends PuzzleDay {
  part1() {
    const distances = parseInput(this.input);
    const locations = [...distances.keys()];
    const permutations = permutator(locations);
    const totals = permutations.map(p => calcTotalDistance(p, distances));
    return `${Math.min(...totals)}`;
  }

  part2() {
    const distances = parseInput(this.input);
    const locations = [...distances.keys()];
    const permutations = permutator(locations);
    const totals = permutations.map(p => calcTotalDistance(p, distances));
    return `${Math.max(...totals)}`;
  }
}
