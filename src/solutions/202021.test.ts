import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202021, parseInput } from './202021';

let day: Puzzle202021;

describe('202021', () => {
  beforeEach(() => {
    day = new Puzzle202021('');
  });

  test('parseInput', () => {
    const input = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
    trh fvjkl sbzzf mxmxvkd (contains dairy)`;

    const result = parseInput(input);

    expect(result).toEqual([
      {
        ingredients: ['mxmxvkd', 'kfcds', 'sqjhc', 'nhms'],
        allergens: ['dairy', 'fish'],
      },
      {
        ingredients: ['trh', 'fvjkl', 'sbzzf', 'mxmxvkd'],
        allergens: ['dairy'],
      },
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
    trh fvjkl sbzzf mxmxvkd (contains dairy)
    sqjhc fvjkl (contains soy)
    sqjhc mxmxvkd sbzzf (contains fish)`);

    const result = day.part1();
    expect(result).toBe('5');
  });

  test('part 2 example 1', () => {
    day.loadData(`mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
    trh fvjkl sbzzf mxmxvkd (contains dairy)
    sqjhc fvjkl (contains soy)
    sqjhc mxmxvkd sbzzf (contains fish)`);

    const result = day.part2();
    expect(result).toBe('mxmxvkd,sqjhc,fvjkl');
  });
});
