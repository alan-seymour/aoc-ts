import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Coord = {
  x: number;
  y: number;
};

type Line = {
  start: Coord;
  end: Coord;
};

export const parseInput = (input: string): Line[] => {
  const lines = splitLines(input).map((l) => {
    const [, startX, startY, endX, endY] =
      l.match(/(\d+),(\d+) -> (\d+),(\d+)/) ?? [];
    return {
      start: { x: parseInt(startX, 10), y: parseInt(startY, 10) },
      end: { x: parseInt(endX, 10), y: parseInt(endY, 10) },
    };
  });
  return lines;
};

const filterNonDiagonal = (lines: Line[]): Line[] =>
  lines.filter((l) => l.start.x === l.end.x || l.start.y === l.end.y);

const mapLines = (lines: Line[]): Map<string, number> => {
  const output = new Map<string, number>();
  lines.forEach((l, i) => {
    let currentCoord = l.start;
    while (currentCoord.x !== l.end.x || currentCoord.y !== l.end.y) {
      const current = output.get(`${currentCoord.x},${currentCoord.y}`) ?? 0;
      output.set(`${currentCoord.x},${currentCoord.y}`, current + 1);
      currentCoord = takeStep(l, currentCoord);
    }
    const current = output.get(`${currentCoord.x},${currentCoord.y}`) ?? 0;
    output.set(`${currentCoord.x},${currentCoord.y}`, current + 1);
  });
  return output;
};

const takeStep = (line: Line, coord: Coord): Coord => ({
  x: Math.sign(line.start.x - line.end.x) * -1 + coord.x,
  y: Math.sign(line.start.y - line.end.y) * -1 + coord.y,
});

const countBig = (map: Map<string, number>): number =>
  [...map.values()].filter((v) => v > 1).length;

export class Puzzle202105 extends PuzzleDay {
  part1() {
    const lines = parseInput(this.input);
    const nonDiag = filterNonDiagonal(lines);
    const map = mapLines(nonDiag);
    const big = countBig(map);
    return `${big}`;
  }

  part2() {
    const lines = parseInput(this.input);
    const map = mapLines(lines);
    const big = countBig(map);
    return `${big}`;
  }
}
