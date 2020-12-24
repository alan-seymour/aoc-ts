import { split } from "lodash";
import { splitLines } from "../helpers";
import { PuzzleDay } from "../puzzleDay";

export const parseInput = (input: string): [number[], number[]] => {
  const [player1, player2] = input.split(/\r?\n\r?\n/).map((v) =>
    splitLines(v)
      .slice(1)
      .map((l) => parseInt(l, 10))
  );

  return [player1, player2];
};

export const playCombatRound = (
  player1: number[],
  player2: number[]
): [number[], number[]] => {
  const player1Card = player1.shift() ?? 0;
  const player2Card = player2.shift() ?? 0;

  if (player1Card > player2Card) {
    return [[...player1, player1Card, player2Card], [...player2]];
  }
  return [[...player1], [...player2, player2Card, player1Card]];
};

export const playCombatUntilWinner = (
  player1: number[],
  player2: number[]
): number[] => {
  while (player1.length > 0 && player2.length > 0) {
    [player1, player2] = playCombatRound(player1, player2);
  }
  if (player1.length > 0) return player1;
  return player2;
};

export const calcScore = (hand: number[]): number =>
  hand
    .slice()
    .reverse()
    .reduce((sum, curr, i) => sum + curr * (i + 1), 0);

const hashHands = (player1: number[], player2: number[]): string => {
  return `${player1.join(",")}:${player2.join(",")}`;
};

export const playRecurisveCombatRound = (
  player1: number[],
  player2: number[]
): [number[], number[]] => {
  const player1card = player1.shift() ?? 0;
  const player2card = player2.shift() ?? 0;
  if (player1.length >= player1card && player2.length >= player2card) {
    const [p1, p2] = playRecursiveUntilWinner(
      player1.slice(0, player1card),
      player2.slice(0, player2card)
    );
    if (p1.length === 0) {
      return [[...player1], [...player2, player2card, player1card]];
    }
    return [[...player1, player1card, player2card], [...player2]];
  } else {
    if (player1card > player2card) {
      return [[...player1, player1card, player2card], [...player2]];
    }
  }
  return [[...player1], [...player2, player2card, player1card]];
};

export const playRecursiveUntilWinner = (
  player1: number[],
  player2: number[]
): [number[], number[]] => {
  const cache = new Set<string>();
  while (player1.length > 0 && player2.length > 0) {
    const hash = hashHands(player1, player2);
    if (cache.has(hash)) {
      return [[...player1], [...player2]];
    }
    cache.add(hash);
    [player1, player2] = playRecurisveCombatRound(player1, player2);
  }
  return [[...player1], [...player2]];
};

export class Puzzle202022 extends PuzzleDay {
  part1() {
    const [player1, player2] = parseInput(this.input);
    const winningHand = playCombatUntilWinner(player1, player2);
    const score = calcScore(winningHand);
    return `${score}`;
  }

  part2() {
    const [player1, player2] = parseInput(this.input);
    const [h1, h2] = playRecursiveUntilWinner(player1, player2);
    let score: number;
    if (h2.length > 0) {
      score = calcScore(h2);
    } else {
      score = calcScore(h1);
    }
    return `${score}`;
  }
}
