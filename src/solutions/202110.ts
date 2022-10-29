import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][] => {
  const lines = splitLines(input).map(l => l.split(''));
  return lines;
};

const isOpening = (char: string): boolean =>
  char === '[' || char === '(' || char === '{' || char === '<';

const isCorrectClosing = (opening: string, closing: string) =>
  (opening === '[' && closing === ']') ||
  (opening === '(' && closing === ')') ||
  (opening === '{' && closing === '}') ||
  (opening === '<' && closing === '>');

const corruptClosingToScore: { [key: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const corruptedScore = (line: string[]): number => {
  const stack: string[] = [];

  for (let i = 0; i < line.length; i++) {
    if (isOpening(line[i])) {
      stack.push(line[i]);
    } else {
      const opening = stack.pop() ?? '?';

      if (!isCorrectClosing(opening, line[i])) {
        return corruptClosingToScore[line[i]];
      }
    }
  }

  return 0;
};

const incompleteClosingToScore: { [key: string]: number } = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

const incompleteScore = (line: string[]): number => {
  const stack: string[] = [];

  for (let i = 0; i < line.length; i++) {
    if (isOpening(line[i])) {
      stack.push(line[i]);
    } else {
      stack.pop();
    }
  }

  let score = 0;

  for (let i = stack.length - 1; i >= 0; i--) {
    score = score * 5;
    score += incompleteClosingToScore[stack[i]];
  }

  return score;
};

export class Puzzle202110 extends PuzzleDay {
  part1() {
    const braces = parseInput(this.input);
    const scores = braces.map(corruptedScore);
    const total = scores.reduce((s, c) => s + c, 0);
    return `${total}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const incompleteLines = lines.filter(l => corruptedScore(l) === 0);
    const scores = incompleteLines.map(incompleteScore).sort((a, b) => a - b);
    return `${scores[Math.floor(scores.length / 2)]}`;
  }
}
