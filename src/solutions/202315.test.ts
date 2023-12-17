import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202315, parseInput } from './202315';

let day: Puzzle202315;

describe('202315', () => {
  beforeEach(() => {
    day = new Puzzle202315('');
  });

  test('parseInput', () => {
    const input = `rn=1,cm-`;

    const result = parseInput(input);

    expect(result).toEqual(['rn=1', 'cm-']);
  });

  test('part 1 example 1', () => {
    day.loadData(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`);
    const result = day.part1();
    expect(result).toBe('1320');
  });

  test('part 2 example 1', () => {
    day.loadData(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`);
    const result = day.part2();
    expect(result).toBe('145');
  });
});
