import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Step = {
  instruction: Instruction,
  value: number,
};

const isInstruction = (i: string): i is Instruction => {
  return instructions.indexOf(i) !== -1;
};

export const parseInput = (input: string): Step[] => {
  const inst = splitLines(input).map(line => {
    const firstChar = line.slice(0, 1);
    return ({
      instruction: isInstruction(firstChar) ? firstChar : 'F',
      value: parseInt(line.slice(1), 10),
    });
  });
  return inst;
};

type Direction = 'N' | 'E' | 'S' | 'W';
type Instruction = 'N' | 'E' | 'S' | 'W' | 'L' | 'R' | 'F';

const instructions = ['N', 'E', 'S', 'W', 'L', 'R', 'F'];
const directions: Direction[] = ['N', 'E', 'S', 'W'];

export class Ship {
  xPos: number;
  yPos: number;
  facing: Direction;
  waypointX: number;
  waypointY: number;

  constructor() {
    this.xPos = 0;
    this.yPos = 0;
    this.facing = 'E';
    this.waypointX = 10;
    this.waypointY = 1;
  }

  waypointCommand(instruction: Instruction, value: number) {
    switch (instruction) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        this.moveWaypoint(instruction, value);
        break;
      case 'L':
      case 'R':
        this.rotateWaypoint(instruction, value);
        break;
      case 'F':
        this.towardWaypoint(value);
        break;
    }
  }

  command(instruction: Instruction, value: number) {
    switch (instruction) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        this.move(instruction, value);
        break;
      case 'L':
      case 'R':
        this.turn(instruction, value);
        break;
      case 'F':
        this.forward(value);
        break;
    }
  }

  turn(direction: 'R' | 'L', value: number) {
    const clicks = value / 90;
    const existingIndex = directions.indexOf(this.facing);
    switch (direction) {
      case 'R':
        this.facing = directions[(existingIndex + clicks) % 4];
        break;
      case 'L':
        this.facing = directions[(existingIndex - clicks + 4) % 4];
        break;
    }
  }

  move(direction: Direction, value: number) {
    switch (direction) {
      case 'N':
        this.yPos += value;
        break;
      case 'E':
        this.xPos += value;
        break;
      case 'S':
        this.yPos -= value;
        break;
      case 'W':
        this.xPos -= value;
    }
  }

  forward(value: number) {
    this.move(this.facing, value);
  }

  towardWaypoint(value: number) {
    this.xPos += (this.waypointX * value);
    this.yPos += (this.waypointY * value);
  }

  moveWaypoint(direction: Direction, value: number) {
    switch (direction) {
      case 'N':
        this.waypointY += value;
        break;
      case 'E':
        this.waypointX += value;
        break;
      case 'S':
        this.waypointY -= value;
        break;
      case 'W':
        this.waypointX -= value;
    }
  }

  rotateWaypoint(direction: 'L' | 'R', value: number) {
    const magnitude = value / 90;
    for (let i = 0; i < magnitude; i++) {
      if (direction === 'L') {
        [this.waypointX, this.waypointY] = [this.waypointY * -1, this.waypointX];
      } else {
        [this.waypointX, this.waypointY] = [this.waypointY, this.waypointX * -1];
      }
    }
  }

  getDistance() {
    return Math.abs(this.xPos) + Math.abs(this.yPos);
  }
}

const executeShipInstructions = (instructions: Step[]): Ship => {
  const ship = new Ship();
  instructions.forEach(i => {
    ship.command(i.instruction, i.value);
  });
  return ship;
};

const executeWaypointInstructions = (instructions: Step[]): Ship => {
  const ship = new Ship();
  instructions.forEach(i => {
    ship.waypointCommand(i.instruction, i.value);
  });
  return ship;
};

export class Puzzle202012 extends PuzzleDay {
  part1() {
    const instructions = parseInput(this.input);
    const finalShip = executeShipInstructions(instructions);
    return `${finalShip.getDistance()}`;
  }

  part2() {
    const instructions = parseInput(this.input);
    const finalShip = executeWaypointInstructions(instructions);
    return `${finalShip.getDistance()}`;
  }
}
