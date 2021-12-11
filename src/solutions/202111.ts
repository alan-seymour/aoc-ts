import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Squid = {
  energy: number;
  flashed: boolean;
};

export const parseInput = (input: string): Squid[][] => {
  const squids = splitLines(input).map((l) =>
    l.split('').map((s) => ({ energy: parseInt(s, 10), flashed: false }))
  );
  return squids;
};

const incrementSquids = (squids: Squid[][]): Squid[][] =>
  squids.map((l) => l.map((s) => ({ energy: s.energy + 1, flashed: false })));

const flash = (squids: Squid[][]): number => {
  let count = 0;
  for (let i = 0; i < squids.length; i++) {
    for (let j = 0; j < squids[i].length; j++) {
      if (squids[i][j].energy > 9 && !squids[i][j].flashed) {
        squids[i][j].flashed = true;
        count++;
        if (squids[i - 1]?.[j - 1] !== undefined) {
          squids[i - 1][j - 1].energy++;
        }
        if (squids[i - 1]?.[j] !== undefined) {
          squids[i - 1][j].energy++;
        }
        if (squids[i - 1]?.[j + 1] !== undefined) {
          squids[i - 1][j + 1].energy++;
        }
        if (squids[i]?.[j - 1] !== undefined) {
          squids[i][j - 1].energy++;
        }
        if (squids[i]?.[j + 1] !== undefined) {
          squids[i][j + 1].energy++;
        }
        if (squids[i + 1]?.[j - 1] !== undefined) {
          squids[i + 1][j - 1].energy++;
        }
        if (squids[i + 1]?.[j] !== undefined) {
          squids[i + 1][j].energy++;
        }
        if (squids[i + 1]?.[j + 1] !== undefined) {
          squids[i + 1][j + 1].energy++;
        }
      }
    }
  }
  return count;
};

const checkIfNeedToFlash = (squids: Squid[][]): boolean =>
  squids.some((l) => l.some((s) => s.energy > 9 && !s.flashed));

const doFlashRounds = (squids: Squid[][]): number => {
  let count = 0;
  while (checkIfNeedToFlash(squids)) {
    count += flash(squids);
  }
  return count;
};

const resetSquids = (squids: Squid[][]): Squid[][] =>
  squids.map((l) =>
    l.map((s) => ({ energy: s.energy > 9 ? 0 : s.energy, flashed: false }))
  );

const doRound = (squids: Squid[][]): { squids: Squid[][]; count: number } => {
  const inc = incrementSquids(squids);
  const count = doFlashRounds(inc);
  const reset = resetSquids(inc);
  return { squids: reset, count };
};

const synced = (squids: Squid[][]): boolean =>
  squids.every((l) => l.every((s) => s.energy === 0));

export class Puzzle202111 extends PuzzleDay {
  part1() {
    let squids = parseInput(this.input);
    let flashes = 0;
    for (let i = 0; i < 100; i++) {
      const output = doRound(squids);
      squids = output.squids;
      flashes += output.count;
    }
    return `${flashes}`;
  }

  part2() {
    let squids = parseInput(this.input);
    let hasSynced = false;
    let count = 0;
    while (!hasSynced) {
      const output = doRound(squids);
      squids = output.squids;
      count++;
      hasSynced = synced(squids);
    }
    return `${count}`;
  }
}
