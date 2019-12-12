import { splitLines } from './helpers';
import { PuzzleDay } from './puzzleDay';

class Vector3D {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(vector: Vector3D): void {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
  }

  subtract(vector: Vector3D): void {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
  }

  absSum(): number {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }

  compare(vector: Vector3D): Vector3D {
    return new Vector3D(
      this.x > vector.x ? 1 : this.x === vector.x ? 0 : -1,
      this.y > vector.y ? 1 : this.y === vector.y ? 0 : -1,
      this.z > vector.z ? 1 : this.z === vector.z ? 0 : -1,
    );
  }

  toString(): string {
    return `<x=${this.x}, y=${this.y}, z=${this.z}>`;
  }
}

type MoonState = {
  position: Vector3D;
  velocity: Vector3D;
  potentialEnergy: number;
  kineticEnergy: number;
  totalEnergy: number;
};

const applyGravity = (moons: MoonState[]) => {
  for (let i = 0; i < moons.length - 1; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      const moon1 = moons[i];
      const moon2 = moons[j];
      const diffs = moon1.position.compare(moon2.position);
      moon1.velocity.subtract(diffs);
      moon2.velocity.add(diffs);
    }
  }
};

const applyVelocity = (moons: MoonState[]) => {
  moons.forEach(moon => moon.position.add(moon.velocity));
};

export const calculateEnergies = (moons: MoonState[]) => {
  moons.forEach(moon => {
    moon.potentialEnergy = moon.position.absSum();
    moon.kineticEnergy = moon.velocity.absSum();
    moon.totalEnergy = moon.potentialEnergy * moon.kineticEnergy;
  });
};

export const calculateTotalEnergy = (moons: MoonState[]): number => {
  return moons.reduce(
    (sum: number, moon: MoonState) => sum + moon.totalEnergy,
    0,
  );
};

const doTimeStep = (moons: MoonState[]) => {
  applyGravity(moons);
  applyVelocity(moons);
};

const hashMoonState = (moon: MoonState) => [
  `${moon.position.x},${moon.velocity.x}`,
  `${moon.position.y},${moon.velocity.y}`,
  `${moon.position.z},${moon.velocity.z}`,
];

const hashSystemState = (moons: MoonState[]) => {
  let xs = '';
  let ys = '';
  let zs = '';
  moons.forEach(moon => {
    const [x, y, z] = hashMoonState(moon);
    xs = `${xs},${x}`;
    ys = `${ys},${y}`;
    zs = `${zs},${z}`;
  });
  return [xs, ys, zs];
};

const gcd2 = (a: number, b: number): number => {
  if (!b) return b === 0 ? a : NaN;
  return gcd2(b, a % b);
};

const lcm2 = (a: number, b: number): number => {
  return (a * b) / gcd2(a, b);
};

const lcm = (numbers: number[]): number => {
  let n = 1;
  for (let i = 0; i < numbers.length; ++i) n = lcm2(numbers[i], n);
  return n;
};

const runUntilLoop = (moons: MoonState[]): number => {
  const xMap = new Map<string, number>();
  const yMap = new Map<string, number>();
  const zMap = new Map<string, number>();
  let count = 0;
  let xLoop = 0;
  let yLoop = 0;
  let zLoop = 0;
  while (!(xLoop && yLoop && zLoop)) {
    const [xhash, yhash, zhash] = hashSystemState(moons);
    if (zLoop === 0) {
      if (zMap.has(zhash)) {
        const first = zMap.get(zhash)!;
        zLoop = count - first;
      } else {
        zMap.set(zhash, count);
      }
    }

    if (yLoop === 0) {
      if (yMap.has(yhash)) {
        const first = yMap.get(yhash)!;
        yLoop = count - first;
        console.log(yhash);
      } else {
        yMap.set(yhash, count);
      }
    }

    if (xLoop === 0) {
      if (xMap.has(xhash)) {
        const first = xMap.get(xhash)!;
        xLoop = count - first;
      } else {
        xMap.set(xhash, count);
      }
    }
    doTimeStep(moons);
    count++;
  }
  return lcm([xLoop, yLoop, zLoop]);
};

export const runForXSteps = (moons: MoonState[], steps: number) => {
  for (let i = 0; i < steps; i++) {
    doTimeStep(moons);
  }
};

export const parseInput = (input: string): MoonState[] => {
  const coords = splitLines(input).map(line => {
    const trimmed = line.substring(1, line.length - 1);
    const strCoords = trimmed.split(',').map(c => c.trim());
    const [x, y, z] = strCoords.map(coord => parseInt(coord.split('=')[1], 10));
    return {
      position: new Vector3D(x, y, z),
      velocity: new Vector3D(),
      kineticEnergy: 0,
      potentialEnergy: 0,
      totalEnergy: 0,
    };
  });
  return coords;
};

export class Puzzle201912 extends PuzzleDay {
  part1() {
    const moons = parseInput(this.input);
    runForXSteps(moons, 1000);
    calculateEnergies(moons);
    return `${calculateTotalEnergy(moons)}`;
  }

  part2() {
    const moons = parseInput(this.input);
    const steps = runUntilLoop(moons);
    return `${steps}`;
  }
}
