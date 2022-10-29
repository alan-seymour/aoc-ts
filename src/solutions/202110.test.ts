import { describe, test, expect, beforeEach } from 'vitest';
import { Puzzle202110, parseInput } from './202110';

let day: Puzzle202110;

describe('202110', () => {
  beforeEach(() => {
    day = new Puzzle202110('');
  });

  test('parseInput', () => {
    const input = `<<{>}
    {}}`;

    const result = parseInput(input);

    expect(result).toEqual([
      ['<', '<', '{', '>', '}'],
      ['{', '}', '}'],
    ]);
  });

  test('part 1 example 1', () => {
    day.loadData(`[({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]`);

    const result = day.part1();
    expect(result).toBe('26397');
  });

  test('part 2 example 1', () => {
    day.loadData(`[({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]`);

    const result = day.part2();
    expect(result).toBe('288957');
  });
});
