import { chunk } from 'lodash';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type RangeMap = {
  source: number;
  destination: number;
  range: number;
};

type Almanac = {
  seeds: number[];
  seedToSoil: RangeMap[];
  soilToFertilizer: RangeMap[];
  fertilizerToWater: RangeMap[];
  waterToLight: RangeMap[];
  lightToTemperature: RangeMap[];
  temperatureToHumidity: RangeMap[];
  humidityToLocation: RangeMap[];
};

export const parseInput = (input: string): Almanac => {
  const lines = splitLines(input);

  const seeds = lines
    .shift()
    ?.split(':')[1]
    .trim()
    .split(' ')
    .map(v => Number(v));

  lines.shift();
  const chunked = splitArray(lines);
  const maps = chunked.map(c => parseMap(c));

  return {
    seeds: seeds ?? [],
    seedToSoil: maps[0] ?? [],
    soilToFertilizer: maps[1] ?? [],
    fertilizerToWater: maps[2] ?? [],
    waterToLight: maps[3] ?? [],
    lightToTemperature: maps[4] ?? [],
    temperatureToHumidity: maps[5] ?? [],
    humidityToLocation: maps[6] ?? [],
  };
};

const splitArray = (input: string[]): string[][] =>
  input.reduce<string[][]>((acc, curr) => {
    if (curr === '') {
      return [...acc, []];
    }

    return [...acc.slice(0, -1), [...(acc.at(-1) ?? []), curr]];
  }, []);

const parseMap = (input: string[]): RangeMap[] =>
  input
    .slice(1)
    .map(l => l.split(' ').map(n => Number(n)))
    .map(([destination, source, range]) => ({ source, destination, range }))
    .sort((a, b) => a.source - b.source);

const traverseMap = (input: number, map: RangeMap[]): number => {
  const clone = map.slice();
  let next = clone.shift();

  while (next !== undefined) {
    if (next.source > input) {
      return input;
    }

    if (next.source <= input && next.source + next.range > input) {
      return input + (next.destination - next.source);
    }

    next = clone.shift();
  }

  return input;
};

const traverseSeed = (seed: number, almanac: Almanac): number => {
  const soil = traverseMap(seed, almanac.seedToSoil);
  const fert = traverseMap(soil, almanac.soilToFertilizer);
  const water = traverseMap(fert, almanac.fertilizerToWater);
  const light = traverseMap(water, almanac.waterToLight);
  const temp = traverseMap(light, almanac.lightToTemperature);
  const humidity = traverseMap(temp, almanac.temperatureToHumidity);
  const location = traverseMap(humidity, almanac.humidityToLocation);

  return location;
};

const traverseSeedRange = (startingSeed: number, range: number, almanac: Almanac): number => {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = startingSeed; i < startingSeed + range; i++) {
    const location = traverseSeed(i, almanac);
    min = Math.min(min, location);
  }

  return min;
};

export class Puzzle202305 extends PuzzleDay {
  part1() {
    const almanac = parseInput(this.input);
    const locations = almanac.seeds.map(s => traverseSeed(s, almanac));
    const closest = Math.min(...locations);
    return `${closest}`;
  }

  part2() {
    const almanac = parseInput(this.input);
    const seedPairs = chunk(almanac.seeds, 2);
    const locations = seedPairs.map(([s, r]) => traverseSeedRange(s, r, almanac));
    const closest = Math.min(...locations);
    return `${closest}`;
  }
}
