import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Links = Map<string, string[]>;

type Path = string[];

type SolutionState = {
  path: Path;
  visitedSmall: Set<string>;
  revisits: number;
};

export const parseInput = (input: string): Links => {
  const links = splitLines(input).reduce<Links>((p, c) => {
    const [start, end] = c.split('-');

    const startRoutes = p.get(start) ?? [];
    const endRoutes = p.get(end) ?? [];

    if (end !== 'start') {
      startRoutes.push(end);
    }

    if (start !== 'start') {
      endRoutes.push(start);
    }

    if (start !== 'end') {
      p.set(start, startRoutes);
    }

    if (end !== 'end') {
      p.set(end, endRoutes);
    }

    return p;
  }, new Map<string, string[]>());

  return links;
};

const findPaths = (links: Links, maxRevisits: number): Path[] => {
  const queue: SolutionState[] = [];
  const found: Path[] = [];

  queue.push({ path: ['start'], visitedSmall: new Set(), revisits: 0 });

  while (queue.length > 0) {
    const state = queue.pop();

    if (!state) {
      throw new Error('how did I get here?');
    }

    const currentLocation = state.path[state.path.length - 1];

    if (currentLocation === 'end') {
      found.push(state.path);
      continue;
    }

    const nextLocations = (links.get(currentLocation) ?? []).filter(
      (l) => state.revisits < maxRevisits || !state.visitedSmall.has(l)
    );
    const visitedSmall = new Set(state.visitedSmall);

    if (currentLocation !== currentLocation.toUpperCase()) {
      visitedSmall.add(currentLocation);
    }

    queue.push(
      ...nextLocations.map((l) => ({
        path: [...state.path, l],
        visitedSmall,
        revisits: visitedSmall.has(l) ? state.revisits + 1 : state.revisits,
      }))
    );
  }

  return found;
};

export class Puzzle202112 extends PuzzleDay {
  part1() {
    const links = parseInput(this.input);
    const paths = findPaths(links, 0);
    return `${paths.length}`;
  }

  part2() {
    const links = parseInput(this.input);
    const paths = findPaths(links, 1);
    return `${paths.length}`;
  }
}
