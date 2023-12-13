import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[][][] => {
  const lines = splitLines(input);

  return lines.reduce<string[][][]>((maps, line) => {
    if (line.trim() === '') {
      return [...maps, []];
    }

    return [...maps.slice(0, -1), [...(maps.at(-1) ?? []), line.split('')]];
  }, []);
};

const findVerticalMirror = (map: string[][]): number[] => {
  const results = [];

  for (let j = 0; j < map[0].length - 1; j++) {
    if (map.every(row => row[j] === row[j + 1])) {
      let checkL = j - 1;
      let checkR = j + 2;
      let valid = true;

      while (checkL >= 0 && checkR < map[0].length && valid) {
        valid = map.every(row => row[checkL] === row[checkR]);
        checkL--;
        checkR++;
      }

      if (valid) {
        results.push(j + 1);
      }
    }
  }

  return results;
};

const findHorizontalMirror = (map: string[][]): number[] => {
  const results = [];

  for (let i = 0; i < map.length - 1; i++) {
    if (map[i].every((cell, j) => cell === map[i + 1][j])) {
      let checkU = i - 1;
      let checkD = i + 2;
      let valid = true;

      while (checkU >= 0 && checkD < map.length && valid) {
        valid = map[checkU].every((c, k) => c === map[checkD][k]);
        checkU--;
        checkD++;
      }

      if (valid) {
        results.push(i + 1);
      }
    }
  }

  return results;
};

const scoreMap = (map: string[][], ignore: number): number | null => {
  const vertical = findVerticalMirror(map);
  const filtered = vertical.filter(x => x !== ignore);

  if (filtered.length > 0) {
    return filtered[0];
  }

  const horizontal = findHorizontalMirror(map);
  const filteredHorizontal = horizontal.filter(x => x * 100 !== ignore);

  if (filteredHorizontal.length > 0) {
    return filteredHorizontal[0] * 100;
  }

  return null;
};

const generateSmudges = (map: string[][]): string[][][] => {
  const maps: string[][][] = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      const duplicated = map.map(row => row.slice());
      duplicated[i][j] = map[i][j] === '#' ? '.' : '#';
      maps.push(duplicated);
    }
  }

  return maps;
};

const scoreWithSmudge = (map: string[][], ignore: number): number | null => {
  const smudged = generateSmudges(map);
  let score = null;
  let index = 0;

  while ((score === null || score === ignore) && index < smudged.length) {
    score = scoreMap(smudged[index], ignore);
    index++;
  }

  return score;
};

export class Puzzle202313 extends PuzzleDay {
  part1() {
    const maps = parseInput(this.input);
    const scores = maps.map(m => scoreMap(m, -1)).filter(score => score !== null);
    const sum = scores.reduce<number>((sum, curr) => (curr !== null ? sum + curr : sum), 0);
    return `${sum}`;
  }

  part2() {
    const maps = parseInput(this.input);

    const originalScores = maps
      .map(m => scoreMap(m, -1))
      .map(score => (score === null ? 0 : score));

    const scores = maps.map((m, i) => scoreWithSmudge(m, originalScores[i]));
    const sum = scores.reduce<number>((sum, curr) => (curr !== null ? sum + curr : sum), 0);
    return `${sum}`;
  }
}
