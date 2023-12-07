import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Hand = {
  cards: number[];
  bid: number;
};

type ScoredHand = Hand & {
  handScore: number;
};

export const parseInput = (input: string): Hand[] => {
  const lines = splitLines(input);

  return lines.map(l => {
    const [handString, bidString] = l.split(' ');

    const hand = handString.split('').map(c => {
      switch (c) {
        case 'A':
          return 14;
        case 'K':
          return 13;
        case 'Q':
          return 12;
        case 'J':
          return 11;
        case 'T':
          return 10;
        default:
          return Number(c);
      }
    });

    return {
      cards: hand,
      bid: Number(bidString),
    };
  });
};

const HandComparator = (a: ScoredHand, b: ScoredHand): number => {
  if (a.handScore !== b.handScore) {
    return a.handScore - b.handScore;
  }

  for (let i = 0; i < a.cards.length; i++) {
    if (a.cards[i] !== b.cards[i]) {
      return a.cards[i] - b.cards[i];
    }
  }

  return 0;
};

export const scoreP1Hand = (hand: Hand): ScoredHand => {
  const freqs = new Map<number, number>();
  hand.cards.forEach(c => freqs.set(c, (freqs.get(c) ?? 0) + 1));
  const freqValues = Array.from(freqs.values());
  let highest = Math.max(...freqValues);

  // Full house
  if (highest === 3 && freqValues.findIndex(v => v === 2) !== -1) {
    highest = 3.5;
  }

  // Two pair
  if (highest === 2 && freqValues.indexOf(2) !== freqValues.lastIndexOf(2)) {
    highest = 2.5;
  }

  return {
    ...hand,
    handScore: highest,
  };
};

export const scoreP2Hand = (hand: Hand): ScoredHand => {
  const cardsWithOutJ = hand.cards.filter(c => c !== 11);
  const jokerCount = hand.cards.length - cardsWithOutJ.length;

  const freqs = new Map<number, number>();
  cardsWithOutJ.forEach(c => freqs.set(c, (freqs.get(c) ?? 0) + 1));
  const freqValues = Array.from(freqs.values());
  let highest = Math.max(...freqValues, 0);

  // Full house
  if (highest === 3 && freqValues.findIndex(v => v === 2) !== -1) {
    highest = 3.5;
  }

  // Two pair
  if (highest === 2 && freqValues.indexOf(2) !== freqValues.lastIndexOf(2)) {
    highest = 2.5;
  }

  highest = highest + jokerCount;

  return {
    cards: hand.cards.map(c => (c === 11 ? 1 : c)),
    bid: hand.bid,
    handScore: highest,
  };
};

export class Puzzle202307 extends PuzzleDay {
  part1() {
    const hands = parseInput(this.input);
    const scored = hands.map(hand => scoreP1Hand(hand));
    scored.sort(HandComparator);
    const scoredHands = scored.map((hand, i) => hand.bid * (i + 1));
    const sum = scoredHands.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }

  part2() {
    const hands = parseInput(this.input);
    const scored = hands.map(hand => scoreP2Hand(hand));
    scored.sort(HandComparator);
    const scoredHands = scored.map((hand, i) => hand.bid * (i + 1));
    const sum = scoredHands.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }
}
