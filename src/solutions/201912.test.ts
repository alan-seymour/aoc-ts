import { describe, test, expect, beforeEach } from 'vitest';
import {
  parseInput,
  Puzzle201912,
  runForXSteps,
  calculateEnergies,
  calculateTotalEnergy,
} from './201912';

describe('201912', () => {
  test('parseInput', () => {
    const input = `<x=-17, y=9, z=-5>
    <x=-1, y=7, z=13>`;

    const result = parseInput(input);
    expect(result[0].position).toEqual({ x: -17, y: 9, z: -5 });
    expect(result[1].position).toEqual({ x: -1, y: 7, z: 13 });
  });

  test('part 1 example 1', () => {
    const input = `<x=-1, y=0, z=2>
    <x=2, y=-10, z=-7>
    <x=4, y=-8, z=8>
    <x=3, y=5, z=-1>`;

    const moons = parseInput(input);
    runForXSteps(moons, 10);
    calculateEnergies(moons);
    const result = calculateTotalEnergy(moons);
    expect(result).toEqual(179);
  });

  test('part 2 example 1', () => {
    const input = `<x=-8, y=-10, z=0>
    <x=5, y=5, z=10>
    <x=2, y=-7, z=3>
    <x=9, y=-8, z=-3>`;

    const day = new Puzzle201912('');
    day.loadData(input);
    const result = day.part2();
    expect(result).toEqual('4686774924');
  });
});
