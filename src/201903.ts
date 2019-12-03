import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

type Step = {
  direction: 'U' | 'D' | 'L' | 'R';
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
  const wirePaths: WirePath[] = wires.map(wire => {
    return wire.split(',').map(
      (step: string): Step => {
        const stepA = step.split('');
        const dir = stepA.shift();
        if (dir === 'U' || dir === 'D' || dir === 'L' || dir === 'R') {
          return {
            direction: dir,
            distance: parseInt(stepA.join(''), 10)
          };
        }
        throw new Error('Bad Input');
      }
    );
  });
  return wirePaths;
};

const takeStep = (step: Step, prevPoint: WirePoint): WirePoint => {
  switch (step.direction) {
    case 'U':
      return {
        x: prevPoint.x,
        y: prevPoint.y + 1,
        length: prevPoint.length + 1
      };
    case 'D':
      return {
        x: prevPoint.x,
        y: prevPoint.y - 1,
        length: prevPoint.length + 1
      };
    case 'L':
      return {
        x: prevPoint.x - 1,
        y: prevPoint.y,
        length: prevPoint.length + 1
      };
    case 'R':
      return {
        x: prevPoint.x + 1,
        y: prevPoint.y,
        length: prevPoint.length + 1
      };
  }
};

const pathToUniquePoints = (path: WirePath) => {
  const uniquePoints = new Map<string, number>();
  const visited = path.reduce(
    (visitedPoints: WirePoint[], step: Step) => {
      const newPoints = [...visitedPoints];
      let distance = step.distance;
      let prevPoint: WirePoint;
      let newPoint: WirePoint;
      while (distance > 0) {
        prevPoint = newPoints[newPoints.length - 1];
        newPoint = takeStep(step, prevPoint);
        if (
          !uniquePoints.get(JSON.stringify({ x: newPoint.x, y: newPoint.y }))
        ) {
          uniquePoints.set(
            JSON.stringify({ x: newPoint.x, y: newPoint.y }),
            newPoint.length
          );
        }
        newPoints.push(newPoint);
        distance--;
      }
      return newPoints;
    },
    [{ x: 0, y: 0, length: 0 }]
  );
  return uniquePoints;
};

const overlapBetweenPointsPath = (
  existingPoints: Map<string, number>,
  path: WirePath
): IntersectionPoint[] => {
  const overlaps: IntersectionPoint[] = [];
  path.reduce(
    (visitedPoints: WirePoint[], step: Step) => {
      const newPoints = [...visitedPoints];
      let distance = step.distance;
      let prevPoint: WirePoint;
      let newPoint: WirePoint;
      while (distance > 0) {
        prevPoint = newPoints[newPoints.length - 1];
        newPoint = takeStep(step, prevPoint);

        const pointA = existingPoints.get(
          JSON.stringify({ x: newPoint.x, y: newPoint.y })
        );
        if (pointA) {
          overlaps.push({
            originDistance: Math.abs(newPoint.x) + Math.abs(newPoint.y),
            combinedDistance: pointA + newPoint.length
          });
        }
        newPoints.push(newPoint);
        distance--;
      }
      return newPoints;
    },
    [{ x: 0, y: 0, length: 0 }]
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
