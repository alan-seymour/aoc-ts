import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Board = number[][];
type Game = {
  boards: Board[];
  calls: number[];
};

export const parseInput = (input: string): Game => {
  const lines = splitLines(input);

  const calls =
    lines
      .shift()
      ?.split(',')
      .map(i => parseInt(i, 10)) ?? [];

  lines.shift();

  const boards: Board[] = [];
  let readBoard: number[][] = [];

  while (lines.length > 0) {
    const nextLine = lines.shift();

    if (nextLine === '') {
      boards.push(readBoard);
      readBoard = [];
    } else {
      readBoard.push(
        nextLine
          ?.split(' ')
          .filter(l => l.trim() !== '')
          .map(d => parseInt(d)) ?? [],
      );
    }
  }

  boards.push(readBoard);

  return { calls, boards };
};

const markNumber = (board: Board, number: number): Board =>
  board.map(l => l.map(d => (d === number ? -1 : d)));

const markBoards = (boards: Board[], number: number): Board[] =>
  boards.map(b => markNumber(b, number));

const checkIfWinningBoard = (board: Board): boolean => checkRows(board) || checkColumns(board);

const checkRows = (board: Board): boolean => board.some(l => l.every(d => d === -1));

const checkColumn = (board: Board, index: number): boolean => board.every(l => l[index] === -1);

const checkColumns = (board: Board): boolean =>
  [...Array(board[0].length).keys()].some(i => checkColumn(board, i));

const calculateValue = (board: Board): number =>
  board.reduce<number>(
    (s, c) =>
      s +
      c.reduce<number>((rs, d) => {
        if (d !== -1) return rs + d;
        return rs;
      }, 0),
    0,
  );

export class Puzzle202104 extends PuzzleDay {
  part1() {
    const parsed = parseInput(this.input);
    const { calls } = parsed;
    let { boards } = parsed;
    let winner: Board | null = null;
    let index = 0;

    while (winner === null && index < calls.length) {
      boards = markBoards(boards, calls[index]);
      index++;
      const winners = boards.filter(checkIfWinningBoard);

      if (winners.length > 0) {
        winner = winners[0];
      }
    }

    if (!winner) {
      return 'No Winners?';
    }

    return `${calculateValue(winner) * calls[index - 1]}`;
  }

  part2() {
    const parsed = parseInput(this.input);
    const { calls } = parsed;
    let { boards } = parsed;
    let loser: Board | null = null;
    let index = 0;

    while (loser === null && index < calls.length) {
      boards = markBoards(boards, calls[index]);
      index++;
      const losers = boards.filter(b => !checkIfWinningBoard(b));

      if (losers.length === 1) {
        loser = losers[0];
      }
    }

    if (!loser) {
      return 'No loser?';
    }

    while (!checkIfWinningBoard(loser)) {
      loser = markNumber(loser, calls[index]);
      index++;
    }

    return `${calculateValue(loser) * calls[index - 1]}`;
  }
}
