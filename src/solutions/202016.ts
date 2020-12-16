import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Rule = {
  ruleName: string,
  range1Min: number,
  range1Max: number,
  range2Min: number,
  range2Max: number,
};

type ParsedInput = {
  rules: Rule[],
  yourTicket: number[],
  otherTickets: number[][],
};

export const parseRules = (input: string): Rule[] => splitLines(input).map(r => {
  const [ruleName, ranges] = r.split(': ');
  const [range1, range2] = ranges.split(' or ');
  const [range1Min, range1Max] = range1.split('-').map(r => parseInt(r, 10));
  const [range2Min, range2Max] = range2.split('-').map(r => parseInt(r, 10));
  return {
    ruleName,
    range1Min,
    range1Max,
    range2Min,
    range2Max
  };
});

export const parseInput = (input: string): ParsedInput => {
  const [rulesSection, yourSection, othersSection] = input.split(/\r?\n\r?\n/);
  const rules = parseRules(rulesSection);
  const yourTicket = splitLines(yourSection)[1].split(',').map(v => parseInt(v, 10));
  const otherTickets = splitLines(othersSection).slice(1).map(line => line.split(',').map(v => parseInt(v)));
  return {
    rules,
    yourTicket,
    otherTickets
  };
};

const invalidFields = (ticket: number[], rules: Rule[]) => ticket.filter(
  field => !rules.some(rule => (
    (field >= rule.range1Min && field <= rule.range1Max) ||
    (field >= rule.range2Min && field <= rule.range2Max)
  )));

const possibleFieldTitles = (values: number[], rules: Rule[]) => rules.filter(
  rule => values.every(
    field =>
      (field >= rule.range1Min && field <= rule.range1Max) ||
      (field >= rule.range2Min && field <= rule.range2Max)
  )
);

type RuleLocations = {
  [key: string]: number[]
};

const computeFieldMaps = (tickets: number[][], rules: Rule[]) => {
  const possibilities: RuleLocations = {};

  for (let i = 0; i <= tickets[0].length; i++) {
    const fieldValues = tickets.map(t => t[i]);
    const possibleRules = possibleFieldTitles(fieldValues, rules);
    possibleRules.forEach(r => {
      if (possibilities[r.ruleName]) {
        possibilities[r.ruleName].push(i);
      } else {
        possibilities[r.ruleName] = [i];
      }
    });
  }

  const placedRules = new Map<number, string>();
  while (placedRules.size < rules.length) {
    for (const pos in possibilities) {
      possibilities[pos] = possibilities[pos].filter(x => !placedRules.has(x));
      if (possibilities[pos].length === 1) {
        placedRules.set(possibilities[pos][0], pos);
      }
    }
  }
  return Array.from(placedRules.entries());
};

export class Puzzle202016 extends PuzzleDay {
  part1() {
    const input = parseInput(this.input);
    const invalidTotals = input.otherTickets.reduce((sum, t) => invalidFields(t, input.rules).reduce((tot, c) => tot + c, 0) + sum, 0);
    return `${invalidTotals}`;
  }

  part2() {
    const input = parseInput(this.input);
    const potentiallyValid = input.otherTickets.filter(t => invalidFields(t, input.rules).length === 0);
    const fieldMaps = computeFieldMaps(potentiallyValid, input.rules);
    const relevantFields = fieldMaps.filter(f => /^departure/.test(f[1])).map(f => f[0]);
    const product = relevantFields.reduce((p, c) => p * input.yourTicket[c], 1);
    return `${product}`;
  }
}
