import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Direction = 'U' | 'D' | 'L' | 'R';

type Step = {
  direction: Direction;
  distance: number;
};

type WirePath = Step[];

type WirePoint = {
  x: number;
  y: number;
  length: number;
};

type IntersectionPoint = {
  combinedDistance: number;
  originDistance: number;
};

export const parseInput = (input: string): WirePath[] => {
  const wires = splitLines(input);

  const wirePaths: WirePath[] = wires.map(wire =>
    wire.split(',').map((step: string): Step => {
      const stepA = step.split('');
      const dir = stepA.shift();

      if (dir === 'U' || dir === 'D' || dir === 'L' || dir === 'R') {
        return {
          direction: dir,
          distance: parseInt(stepA.join(''), 10),
        };
      }

      throw new Error('Bad Input');
    }),
  );

  return wirePaths;
};

type StepFuncType = {
  [K in Direction]: (prevPoint: WirePoint) => WirePoint;
};

const takeStep: StepFuncType = {
  U: ({ x, y, length }: WirePoint) => ({ x, y: y + 1, length: length + 1 }),
  D: ({ x, y, length }: WirePoint) => ({ x, y: y - 1, length: length + 1 }),
  L: ({ x, y, length }: WirePoint) => ({ x: x - 1, y, length: length + 1 }),
  R: ({ x, y, length }: WirePoint) => ({ x: x + 1, y, length: length + 1 }),
};

const hashPoint = (point: WirePoint): string => `${point.x},${point.y}`;

const pathToUniquePoints = (path: WirePath) => {
  const uniquePoints = new Map<string, number>();

  path.reduce(
    (lastPoint: WirePoint, step: Step) => {
      let distance = step.distance;
      let newPoint: WirePoint = lastPoint;
      let prevPoint: WirePoint = lastPoint;

      while (distance > 0) {
        newPoint = takeStep[step.direction](prevPoint);
        const pointHash = hashPoint(newPoint);

        if (!uniquePoints.get(pointHash)) {
          uniquePoints.set(pointHash, newPoint.length);
        }

        distance--;
        prevPoint = newPoint;
      }

      return newPoint;
    },
    { x: 0, y: 0, length: 0 },
  );

  return uniquePoints;
};

const overlapBetweenPointsPath = (
  existingPoints: Map<string, number>,
  path: WirePath,
): IntersectionPoint[] => {
  const overlaps: IntersectionPoint[] = [];

  path.reduce(
    (lastPoint: WirePoint, step: Step) => {
      let distance = step.distance;
      let prevPoint: WirePoint = lastPoint;
      let newPoint: WirePoint = lastPoint;

      while (distance > 0) {
        newPoint = takeStep[step.direction](prevPoint);
        const pointHash = hashPoint(newPoint);
        const pointA = existingPoints.get(pointHash);

        if (pointA) {
          overlaps.push({
            originDistance: Math.abs(newPoint.x) + Math.abs(newPoint.y),
            combinedDistance: pointA + newPoint.length,
          });
        }

        distance--;
        prevPoint = newPoint;
      }

      return newPoint;
    },
    { x: 0, y: 0, length: 0 },
  );

  return overlaps;
};

export class Puzzle201903 extends PuzzleDay {
  part1() {
    const wirePaths = parseInput(this.input);
    const wireAPoints = pathToUniquePoints(wirePaths[0]);
    const intersections = overlapBetweenPointsPath(wireAPoints, wirePaths[1]);
    intersections.sort((a, b) => a.originDistance - b.originDistance);
    return `${intersections[0].originDistance}`;
  }

  part2() {
    const wirePaths = parseInput(this.input);
    const wireAPoints = pathToUniquePoints(wirePaths[0]);
    const intersections = overlapBetweenPointsPath(wireAPoints, wirePaths[1]);
    intersections.sort((a, b) => a.combinedDistance - b.combinedDistance);
    return `${intersections[0].combinedDistance}`;
  }
}
