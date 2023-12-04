import { exit } from 'process';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Card = {
  number: number;
  winning: number[];
  numbers: number[];
};

export const parseInput = (input: string): Card[] => {
  const cards = splitLines(input).map(l => {
    const [intro, numbers] = l.split(':');
    const [winningNumberString, numberString] = numbers.split('|').map(d => d.trim());
    const [_, number] = intro.replace(/\s+/, ' ').split(' ');

    return {
      number: Number(number),
      winning: winningNumberString
        .split(' ')
        .filter(n => n !== '')
        .map(n => Number(n)),
      numbers: numberString
        .split(' ')
        .filter(n => n !== '')
        .map(n => Number(n)),
    };
  });

  return cards;
};

const scoreCards = (cards: Card[]): number[] =>
  cards.map(card => Math.floor(2 ** (countWins(card) - 1)));

const countWins = (card: Card): number =>
  card.numbers.filter(n => card.winning.some(w => w === n)).length;

const resultCache = new Map<number, number>();

const countCards = (cards: Card[]): number =>
  cards.reduce((sum, curr) => countCard(curr, cards) + sum, 0);

const countCard = (card: Card, allCards: Card[]): number => {
  if (card.number === 0) {
    console.error('CARD 0!', card);
    exit();
  }

  if (resultCache.has(card.number)) {
    const cacheResult = resultCache.get(card.number);
    return cacheResult ?? 1;
  }

  const wins = countWins(card);

  const nextCards = allCards.slice(card.number, card.number + wins);

  const subCardCount = nextCards.reduce((sum, curr) => sum + countCard(curr, allCards), 0);

  resultCache.set(card.number, subCardCount + 1);
  return subCardCount + 1;
};

export class Puzzle202304 extends PuzzleDay {
  part1() {
    const cards = parseInput(this.input);
    const scores = scoreCards(cards);
    const sum = scores.reduce((sum, curr) => sum + curr, 0);
    return `${sum}`;
  }

  part2() {
    const cards = parseInput(this.input);
    const totalCards = countCards(cards);
    return `${totalCards}`;
  }
}
