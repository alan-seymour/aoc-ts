import { describe, test, expect, beforeEach, it } from 'vitest';
import { parseInput, Robot, Stats, Grid } from './201911';

describe('201911', () => {
  test('parseInput', () => {
    const input = `3500,9,10,70,2,3,11,0,99,30,40,50`;
    const result = parseInput(input);
    expect(result).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
  });

  describe('Robot Actions', () => {
    test('Robot constructor', () => {
      const robot = new Robot();
      expect(robot.location).toEqual({ x: 0, y: 0 });
      expect(robot.facing).toEqual('U');
    });

    test('Robot Turn L', () => {
      const robot = new Robot();
      robot.turn('L');
      expect(robot.facing).toEqual('L');
      robot.turn('L');
      expect(robot.facing).toEqual('D');
      robot.turn('L');
      expect(robot.facing).toEqual('R');
      robot.turn('L');
      expect(robot.facing).toEqual('U');
    });

    test('Robot Turn R', () => {
      const robot = new Robot();
      robot.turn('R');
      expect(robot.facing).toEqual('R');
      robot.turn('R');
      expect(robot.facing).toEqual('D');
      robot.turn('R');
      expect(robot.facing).toEqual('L');
      robot.turn('R');
      expect(robot.facing).toEqual('U');
    });

    test('Robot Move Up', () => {
      const robot = new Robot();
      robot.move();
      expect(robot.location).toEqual({ x: 0, y: -1 });
    });

    test('Robot Move Down', () => {
      const robot = new Robot();
      robot.facing = 'D';
      robot.move();
      expect(robot.location).toEqual({ x: 0, y: 1 });
    });

    test('Robot Move Left', () => {
      const robot = new Robot();
      robot.facing = 'L';
      robot.move();
      expect(robot.location).toEqual({ x: -1, y: 0 });
    });

    test('Robot Move Right', () => {
      const robot = new Robot();
      robot.facing = 'R';
      robot.move();
      expect(robot.location).toEqual({ x: 1, y: 0 });
    });
  });

  describe('Stats Actions', () => {
    it(`updates maxes`, () => {
      const stats = new Stats();
      stats.minX = 0;
      stats.minY = 0;
      stats.maxX = 0;
      stats.maxY = 0;
      stats.update({ x: 1, y: 1 }, false);
      expect(stats.minX).toEqual(0);
      expect(stats.minY).toEqual(0);
      expect(stats.maxX).toEqual(1);
      expect(stats.maxY).toEqual(1);
    });

    it(`updates mins`, () => {
      const stats = new Stats();
      stats.minX = 0;
      stats.minY = 0;
      stats.maxX = 0;
      stats.maxY = 0;
      stats.update({ x: -1, y: -1 }, false);
      expect(stats.minX).toEqual(-1);
      expect(stats.minY).toEqual(-1);
      expect(stats.maxX).toEqual(0);
      expect(stats.maxY).toEqual(0);
    });

    it('updates unique painted locations', () => {
      const stats = new Stats();
      expect(stats.uniquePainted.size).toEqual(0);
      stats.update({ x: 0, y: 0 }, true);
      expect(stats.uniquePainted.size).toEqual(1);
      stats.update({ x: 1, y: 1 }, true);
      expect(stats.uniquePainted.size).toEqual(2);
      stats.update({ x: 0, y: 0 }, true);
      expect(stats.uniquePainted.size).toEqual(2);
    });
  });

  describe('Grid Actions', () => {
    test('set and get colour', () => {
      const grid = new Grid();
      expect(grid.getColor({ x: 0, y: 0 })).toEqual(0);
      grid.setColor({ x: 0, y: 0 }, 1);
      expect(grid.getColor({ x: 0, y: 0 })).toEqual(1);
    });

    test('set and get current colour', () => {
      const grid = new Grid();
      expect(grid.getColor({ x: 1, y: 1 })).toEqual(0);
      grid.robot.location = { x: 1, y: 1 };
      expect(grid.getCurrentColor()).toEqual(0);
      grid.setCurrentColor(1);
      expect(grid.getCurrentColor()).toEqual(1);
    });

    test('turn and move robot', () => {
      const grid = new Grid();
      expect(grid.robot.location).toEqual({ x: 0, y: 0 });
      expect(grid.robot.facing).toEqual('U');
      grid.turnAndMoveRobot('L');
      expect(grid.robot.location).toEqual({ x: -1, y: 0 });
      expect(grid.robot.facing).toEqual('L');
    });

    test('grid to string', () => {
      const grid = new Grid();
      grid.setColor({ x: 0, y: 0 }, 1);
      grid.setColor({ x: 1, y: 0 }, 1);
      grid.setColor({ x: 1, y: 1 }, 1);
      expect(grid.toString()).toEqual(`##\n #`);
    });
  });
});
