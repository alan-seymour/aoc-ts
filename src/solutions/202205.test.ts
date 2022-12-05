import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202205, parseInput } from './202205';

let day: Puzzle202205;

describe('202205', () => {
  beforeEach(() => {
    day = new Puzzle202205('');
  });

  test('parseInput', () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

    const result = parseInput(input);

    expect(result).toEqual([
      [['N', 'Z'], ['D', 'C', 'M'], ['P']],
      [
        [1, 2, 1],
        [3, 1, 3],
        [2, 2, 1],
        [1, 1, 2],
      ],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`);

    const result = day.part1();
    expect(result).toBe('CMZ');
  });

  test('part 2 example 1', () => {
    day.loadData(`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`);

    const result = day.part2();
    expect(result).toBe('MCD');
  });
});
