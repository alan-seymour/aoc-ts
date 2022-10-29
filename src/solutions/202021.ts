import { difference, intersection, remove, uniq } from 'lodash';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type ParsedInput = {
  ingredients: string[];
  allergens: string[];
};

export const parseInput = (input: string): ParsedInput[] => {
  const lines = splitLines(input).map(v => {
    const [ing, al] = v.split(' (contains ');
    const ingredients = ing.split(' ');
    const allergens = al.slice(0, -1).split(', ');
    return {
      ingredients,
      allergens,
    };
  });

  return lines;
};

const setupAllAllegens = (input: ParsedInput[]) => {
  const allergens = new Map<string, string[]>();

  input.forEach(i => {
    i.allergens.forEach(a => {
      if (allergens.has(a)) {
        const existingIngredients = allergens.get(a);
        if (!existingIngredients) throw new Error(`shouldn't be here`);
        const overlap = intersection(existingIngredients, i.ingredients);
        allergens.set(a, overlap);
      } else {
        allergens.set(a, i.ingredients);
      }
    });
  });

  return allergens;
};

const findMissingIngredients = (
  input: ParsedInput[],
  allergenPosibilities: Map<string, string[]>,
) => {
  const allIngredients = input.reduce<string[]>((all, i) => [...all, ...i.ingredients], []);
  const allPossibleAllergenIngredients = uniq(Array.from(allergenPosibilities.values()).flat());

  const missing = difference(allIngredients, allPossibleAllergenIngredients);
  return missing;
};

const countMissing = (input: ParsedInput[], missing: string[]) =>
  input.reduce((sum, { ingredients }) => sum + intersection(ingredients, missing).length, 0);

const resolveAllergens = (allergenPossibilities: Map<string, string[]>) => {
  const allergens = Array.from(allergenPossibilities.keys());
  const result = new Map<string, string>();
  let index = 0;

  while (allergenPossibilities.size > 0) {
    const allergen = allergens[index];

    if (allergenPossibilities.has(allergen)) {
      const poss = allergenPossibilities.get(allergen);
      if (!poss) throw new Error();

      if (poss.length === 1) {
        result.set(allergen, poss[0]);
        allergenPossibilities.delete(allergen);

        allergenPossibilities.forEach((i, j) => {
          allergenPossibilities.set(
            j,
            i.filter(n => n !== poss[0]),
          );
        });
      }
    }

    index++;
    index %= allergens.length;
  }

  return result;
};

export class Puzzle202021 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const allergenPosibilities = setupAllAllegens(input);
    const missing = findMissingIngredients(input, allergenPosibilities);
    const count = countMissing(input, missing);
    return `${count}`;
  }

  part2() {
    const input = parseInput(this.input);
    const allergenPosibilities = setupAllAllegens(input);
    const resolved = resolveAllergens(allergenPosibilities);

    const sorted = Array.from(resolved)
      .sort((a, b) => {
        if (a[0] < b[0]) {
          return -1;
        } else {
          return 1;
        }
      })
      .map(v => v[1]);

    return `${sorted.join(',')}`;
  }
}
