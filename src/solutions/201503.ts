import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): string[] => {
  const directions = input.trim().split('');
  return directions;
};

const deliver = (directions: string[]): Set<string> => {
  const { houses } = directions.reduce<{ houses: Set<string>; location: { x: number; y: number } }>(
    ({ houses, location }, curr) => {
      let x = location.x;
      let y = location.y;

      if (curr === '^') {
        y++;
      } else if (curr === 'v') {
        y--;
      } else if (curr === '<') {
        x--;
      } else if (curr === '>') {
        x++;
      }

      houses.add(`${x},${y}`);

      return { houses: houses, location: { x, y } };
    },
    { houses: new Set(['0,0']), location: { x: 0, y: 0 } },
  );

  return houses;
};

export class Puzzle201503 extends PuzzleDay {
  part1() {
    const directions = parseInput(this.input);
    const houses = deliver(directions);
    return `${houses.size}`;
  }

  part2() {
    const directions = parseInput(this.input);
    const santaHouses = deliver(directions.filter((_, i) => i % 2 === 0));
    const robotHouses = deliver(directions.filter((_, i) => i % 2 === 1));
    const allHouses = new Set([...santaHouses, ...robotHouses]);
    return `${allHouses.size}`;
  }
}
