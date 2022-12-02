import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): [string, string][] => {
  const lines = splitLines(input).map<[string, string]>(line => {
    const [a, b] = line.split(' ');
    return [a, b];
  });

  return lines;
};

const scoreRoundPart1 = (playerA: string, playerB: string): number => {
  const shapeScore = playerB === 'X' ? 1 : playerB === 'Y' ? 2 : 3;

  const didWin =
    (playerA === 'A' && playerB === 'Y') ||
    (playerA === 'B' && playerB === 'Z') ||
    (playerA === 'C' && playerB === 'X');

  const didDraw =
    (playerA === 'A' && playerB === 'X') ||
    (playerA === 'B' && playerB === 'Y') ||
    (playerA === 'C' && playerB === 'Z');

  const winScore = didWin ? 6 : didDraw ? 3 : 0;

  return winScore + shapeScore;
};

const scoreRoundPart2 = (playerA: string, playerB: string): number => {
  const didWin = playerB === 'Z';
  const didDraw = playerB === 'Y';

  let shapeScore = 0;

  if (didWin) {
    shapeScore = playerA === 'A' ? 2 : playerA === 'B' ? 3 : 1;
  } else if (didDraw) {
    shapeScore = playerA === 'A' ? 1 : playerA === 'B' ? 2 : 3;
  } else {
    shapeScore = playerA === 'A' ? 3 : playerA === 'B' ? 1 : 2;
  }

  const winScore = didWin ? 6 : didDraw ? 3 : 0;

  return winScore + shapeScore;
};

export class Puzzle202202 extends PuzzleDay {
  part1() {
    const games = parseInput(this.input);
    const scores = games.map(([a, b]) => scoreRoundPart1(a, b));
    const total = scores.reduce((c, s) => c + s, 0);
    return `${total}`;
  }

  part2() {
    const games = parseInput(this.input);
    const scores = games.map(([a, b]) => scoreRoundPart2(a, b));
    const total = scores.reduce((c, s) => c + s, 0);
    return `${total}`;
  }
}
