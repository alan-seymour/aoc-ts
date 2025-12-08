import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Movement = {
  direction: 'L' | 'R';
  distance: number;
};

export const parseInput = (input: string): Movement[] => {
  const lines = splitLines(input).map<Movement>(line => ({
    direction: line[0] === 'R' ? 'R' : 'L',
    distance: parseInt(line.slice(1), 10),
  }));

  return lines;
};

const doMovement = (
  startingPoint: number,
  movement: Movement,
): { endingPoint: number; timeHitZero: number } => {
  let zeros = Math.floor(movement.distance / 100);
  const netMove = movement.distance % 100;
  let newPosition = movement.direction === 'L' ? startingPoint - netMove : startingPoint + netMove;

  if (newPosition < 0) {
    newPosition = 100 + newPosition;
    if (startingPoint !== 0) {
      zeros++;
    }
  } else if (newPosition >= 100) {
    newPosition = newPosition - 100;
    zeros++;
  } else if (newPosition === 0) {
    zeros++;
  }

  return {
    endingPoint: newPosition,
    timeHitZero: zeros,
  };
};

export class Puzzle202501 extends PuzzleDay {
  part1() {
    const movements = parseInput(this.input);
    const { zeros } = movements.reduce<{ zeros: number; position: number }>(
      ({ zeros, position }, movement) => {
        const { endingPoint } = doMovement(position, movement);
        if (endingPoint === 0) {
          zeros++;
        }

        return { zeros, position: endingPoint };
      },
      { zeros: 0, position: 50 },
    );
    return `${zeros}`;
  }

  part2() {
    const movements = parseInput(this.input);
    const { zeros } = movements.reduce<{ zeros: number; position: number }>(
      ({ zeros, position }, movement) => {
        const { endingPoint, timeHitZero } = doMovement(position, movement);
        console.log(movement, endingPoint, timeHitZero);

        return { zeros: zeros + timeHitZero, position: endingPoint };
      },
      { zeros: 0, position: 50 },
    );
    return `${zeros}`;
  }
}
