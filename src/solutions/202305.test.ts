import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202305, parseInput } from './202305';

let day: Puzzle202305;

describe('202305', () => {
  beforeEach(() => {
    day = new Puzzle202305('');
  });

  test('parseInput', () => {
    const input = `seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48
    
    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15
    
    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4
    
    water-to-light map:
    88 18 7
    18 25 70
    
    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13
    
    temperature-to-humidity map:
    0 69 1
    1 0 69
    
    humidity-to-location map:
    60 56 37
    56 93 4`;

    const result = parseInput(input);

    expect(result).toEqual({
      seeds: [79, 14, 55, 13],
      seedToSoil: [
        { destination: 52, source: 50, range: 48 },
        { destination: 50, source: 98, range: 2 },
      ],
      soilToFertilizer: [
        { destination: 39, source: 0, range: 15 },
        { destination: 0, source: 15, range: 37 },
        { destination: 37, source: 52, range: 2 },
      ],
      fertilizerToWater: [
        { destination: 42, source: 0, range: 7 },
        { destination: 57, source: 7, range: 4 },
        { destination: 0, source: 11, range: 42 },
        { destination: 49, source: 53, range: 8 },
      ],
      waterToLight: [
        { destination: 88, source: 18, range: 7 },
        { destination: 18, source: 25, range: 70 },
      ],
      lightToTemperature: [
        { destination: 81, source: 45, range: 19 },
        { destination: 68, source: 64, range: 13 },
        { destination: 45, source: 77, range: 23 },
      ],
      temperatureToHumidity: [
        { destination: 1, source: 0, range: 69 },
        { destination: 0, source: 69, range: 1 },
      ],
      humidityToLocation: [
        { destination: 60, source: 56, range: 37 },
        { destination: 56, source: 93, range: 4 },
      ],
    });
  });

  test('part 1 example 1', () => {
    day.loadData(`seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48
    
    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15
    
    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4
    
    water-to-light map:
    88 18 7
    18 25 70
    
    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13
    
    temperature-to-humidity map:
    0 69 1
    1 0 69
    
    humidity-to-location map:
    60 56 37
    56 93 4`);

    const result = day.part1();
    expect(result).toBe('35');
  });

  test('part 2 example 1', () => {
    day.loadData(`seeds: 79 14 55 13

    seed-to-soil map:
    50 98 2
    52 50 48
    
    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15
    
    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4
    
    water-to-light map:
    88 18 7
    18 25 70
    
    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13
    
    temperature-to-humidity map:
    0 69 1
    1 0 69
    
    humidity-to-location map:
    60 56 37
    56 93 4`);

    const result = day.part2();
    expect(result).toBe('46');
  });

  test('part 2 example 2', () => {
    day.loadData(`seeds: 82 1

    seed-to-soil map:
    50 98 2
    52 50 48
    
    soil-to-fertilizer map:
    0 15 37
    37 52 2
    39 0 15
    
    fertilizer-to-water map:
    49 53 8
    0 11 42
    42 0 7
    57 7 4
    
    water-to-light map:
    88 18 7
    18 25 70
    
    light-to-temperature map:
    45 77 23
    81 45 19
    68 64 13
    
    temperature-to-humidity map:
    0 69 1
    1 0 69
    
    humidity-to-location map:
    60 56 37
    56 93 4`);

    const result = day.part2();
    expect(result).toBe('46');
  });
});
