import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Ingredient = {
  chemical: string;
  quantity: number;
};

type Reaction = {
  ingredients: Ingredient[];
  output: Ingredient;
};

type ReactionTree = Map<string, Reaction>;

export const parseInput = (input: string): ReactionTree => {
  const reactionMap = new Map<string, Reaction>();
  const reactionStrings = splitLines(input).map(line => parseInputLine(line));

  reactionStrings.forEach(reaction => {
    reactionMap.set(reaction.output.chemical, reaction);
  });

  return reactionMap;
};

export const parseInputLine = (input: string): Reaction => {
  const [ingredientString, outputString] = input.split('=>');

  const ingredients = ingredientString.split(',').map(i => parseIngredient(i.trim()));

  const output = parseIngredient(outputString);
  return {
    ingredients,
    output,
  };
};

export const parseIngredient = (input: string): Ingredient => {
  const parts = input.trim().split(' ');
  return {
    chemical: parts[1],
    quantity: parseInt(parts[0], 10),
  };
};

const calculateOreForFuel = (reactions: ReactionTree): number => {
  const required = new Map<string, Ingredient>();
  const spare = new Map<string, Ingredient>();
  const requiredIterator = required.values();
  let ore = 0;
  required.set('FUEL', { chemical: 'FUEL', quantity: 6326857 });

  for (const { chemical, quantity } of requiredIterator) {
    let newQuantity = quantity;
    const spareItem = spare.get(chemical);

    if (spareItem) {
      if (spareItem.quantity > newQuantity) {
        spare.set(chemical, {
          chemical,
          quantity: spareItem.quantity - newQuantity,
        });

        required.delete(chemical);
        continue;
      } else if (spareItem.quantity === newQuantity) {
        spare.delete(chemical);
        required.delete(chemical);
        continue;
      } else {
        spare.delete(chemical);
        newQuantity = newQuantity - spareItem.quantity;
      }
    }

    const recipe = reactions.get(chemical);

    if (!recipe) {
      throw new Error(`no way to make ${chemical}`);
    }

    const requirementCount = Math.ceil(quantity / recipe.output.quantity);
    const spareChem = recipe.output.quantity * requirementCount - quantity;

    spare.set(chemical, { chemical, quantity: spareChem });

    recipe.ingredients.forEach(ingredient => {
      const requiredQuantity = ingredient.quantity * requirementCount;

      if (ingredient.chemical === 'ORE') {
        ore = ore + requiredQuantity;
      } else {
        const existingRequirement = required.get(ingredient.chemical);

        if (!existingRequirement) {
          required.set(ingredient.chemical, {
            chemical: ingredient.chemical,
            quantity: requiredQuantity,
          });
        } else {
          required.set(ingredient.chemical, {
            chemical: ingredient.chemical,
            quantity: requiredQuantity + existingRequirement.quantity,
          });
        }
      }
    });

    required.delete(chemical);
  }

  return ore;
};

const calculateRawOreForFuel = (reactions: ReactionTree): number => {
  const required = new Map<string, Ingredient>();
  const requiredIterator = required.values();
  let ore = 0;
  required.set('FUEL', { chemical: 'FUEL', quantity: 1 });

  for (const { chemical, quantity } of requiredIterator) {
    const recipe = reactions.get(chemical);

    if (!recipe) {
      throw new Error(`no way to make ${chemical}`);
    }

    const requirementCount = quantity / recipe.output.quantity;

    recipe.ingredients.forEach(ingredient => {
      const requiredQuantity = ingredient.quantity * requirementCount;

      if (ingredient.chemical === 'ORE') {
        ore = ore + requiredQuantity;
      } else {
        const existingRequirement = required.get(ingredient.chemical);

        if (!existingRequirement) {
          required.set(ingredient.chemical, {
            chemical: ingredient.chemical,
            quantity: requiredQuantity,
          });
        } else {
          required.set(ingredient.chemical, {
            chemical: ingredient.chemical,
            quantity: requiredQuantity + existingRequirement.quantity,
          });
        }
      }
    });

    required.delete(chemical);
  }

  return ore;
};

export class Puzzle201914 extends PuzzleDay {
  part1() {
    // const reactions = parseInput(this.input);
    const reactions = parseInput(this.input);
    const ore = calculateOreForFuel(reactions);
    return `${ore}`;
  }

  part2() {
    const reactions = parseInput(this.input);
    const ore = calculateRawOreForFuel(reactions);
    const fuel = Math.floor(1000000000000 / ore);
    return `${fuel}`;
  }
}
