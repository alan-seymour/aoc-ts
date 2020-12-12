import { Puzzle202007, parseInput, BagRules, invertRules } from './202007';

let day: Puzzle202007;

describe('202007', () => {
  beforeEach(() => {
    day = new Puzzle202007('');
  });

  test('parseInput', () => {
    const input = `light red bags contain 1 bright white bag, 2 muted yellow bags.
    dark orange bags contain 3 bright white bags, 4 muted yellow bags.`;
    const result = parseInput(input);
    expect(result).toEqual({
      'light red': [
        { colour: 'bright white', quantity: 1 },
        { colour: 'muted yellow', quantity: 2 }
      ],
      'dark orange': [
        {
          colour: 'bright white',
          quantity: 3,
        },
        {
          colour: 'muted yellow',
          quantity: 4,
        },
      ],
    });
  });

  test('invertInput', () => {
    const input: BagRules = {
      'light red': [
        { colour: 'bright white', quantity: 1 },
        { colour: 'muted yellow', quantity: 2 }
      ],
      'dark orange': [
        {
          colour: 'bright white',
          quantity: 3,
        },
        {
          colour: 'muted yellow',
          quantity: 4,
        },
      ],
    };
    const expected: BagRules = {
      'bright white': [
        {
          colour: 'light red',
          quantity: 1,
        },
        {
          colour: 'dark orange',
          quantity: 3,
        }
      ],
      'muted yellow': [
        {
          colour: 'light red',
          quantity: 2,
        },
        {
          colour: 'dark orange',
          quantity: 4
        }
      ]
    };
    expect(invertRules(input)).toMatchObject(expected);

  });

  test('Part 1 example 1', () => {
    day.loadData(`light red bags contain 1 bright white bag, 2 muted yellow bags.
    dark orange bags contain 3 bright white bags, 4 muted yellow bags.
    bright white bags contain 1 shiny gold bag.
    muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
    shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
    dark olive bags contain 3 faded blue bags, 4 dotted black bags.
    vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
    faded blue bags contain no other bags.
    dotted black bags contain no other bags.`);
    const result = day.part1();
    expect(result).toBe('4');
  });

  test('Part 2 example 1', () => {
    day.loadData(`shiny gold bags contain 2 dark red bags.
    dark red bags contain 2 dark orange bags.
    dark orange bags contain 2 dark yellow bags.
    dark yellow bags contain 2 dark green bags.
    dark green bags contain 2 dark blue bags.
    dark blue bags contain 2 dark violet bags.
    dark violet bags contain no other bags.`);
    const result = day.part2();
    expect(result).toBe('126');
  });

});
