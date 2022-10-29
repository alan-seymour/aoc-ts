import { intersection, xor } from 'lodash';
import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type Display = {
  patterns: string[];
  output: string[];
};

export const parseInput = (input: string): Display[] => {
  const lines = splitLines(input).map(line => {
    const [patterns, output] = line.split('|').map(part => part.split(' ').filter(Boolean));

    return { patterns, output };
  });

  return lines;
};

const countSimple = (displays: Display[]): number =>
  displays.reduce<number>(
    (s, c) =>
      s +
      c.output.filter(o => o.length === 2 || o.length === 3 || o.length === 4 || o.length === 7)
        .length,
    0,
  );

const countSegmentFrequency = (patterns: string[]) =>
  patterns.reduce(
    (t, p) => {
      const chars = p.split('');
      return {
        a: chars.includes('a') ? t.a + 1 : t.a,
        b: chars.includes('b') ? t.b + 1 : t.b,
        c: chars.includes('c') ? t.c + 1 : t.c,
        d: chars.includes('d') ? t.d + 1 : t.d,
        e: chars.includes('e') ? t.e + 1 : t.e,
        f: chars.includes('f') ? t.f + 1 : t.f,
        g: chars.includes('g') ? t.g + 1 : t.g,
      };
    },
    { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0 },
  );

const decodeDisplay = (display: Display): Map<string, string> => {
  const decoded = new Map<string, string>();
  const freqs = countSegmentFrequency(display.patterns);
  const one = display.patterns.find(p => p.length === 2)?.split('');
  const seven = display.patterns.find(p => p.length === 3)?.split('');
  const four = display.patterns.find(p => p.length === 4)?.split('');
  decoded.set('a', xor(one, seven)[0]);

  Object.entries(freqs).forEach(([k, v]) => {
    if (v === 6) {
      decoded.set('b', k);
    } else if (v === 8 && k !== decoded.get('a')) {
      decoded.set('c', k);
    } else if (v === 4) {
      decoded.set('e', k);
    } else if (v === 9) {
      decoded.set('f', k);
    }
  });

  const candidatesDG = Object.entries(freqs)
    .filter(([, v]) => v === 7)
    .map(([k]) => k);

  decoded.set('d', intersection(four, candidatesDG)[0]);
  decoded.set('g', candidatesDG.find(c => c !== decoded.get('d')) ?? '');
  return decoded;
};

const decodedToNumbers = (decoded: Map<string, string>, patterns: string[]) => {
  const zero =
    patterns
      .find(
        p =>
          p.length === 6 &&
          p.includes(decoded.get('c') ?? '') &&
          p.includes(decoded.get('e') ?? ''),
      )
      ?.split('')
      .sort()
      .join('') ?? '';

  const one =
    patterns
      .find(p => p.length === 2)
      ?.split('')
      .sort()
      .join('') ?? '';

  const two =
    patterns
      .find(
        p =>
          p.length === 5 &&
          p.includes(decoded.get('c') ?? '') &&
          p.includes(decoded.get('e') ?? ''),
      )
      ?.split('')
      .sort()
      .join('') ?? '';

  const three =
    patterns
      .find(
        p =>
          p.length === 5 &&
          p.includes(decoded.get('c') ?? '') &&
          p.includes(decoded.get('f') ?? ''),
      )
      ?.split('')
      .sort()
      .join('') ?? '';

  const four =
    patterns
      .find(p => p.length === 4)
      ?.split('')
      .sort()
      .join('') ?? '';

  const five =
    patterns
      .find(
        p =>
          p.length === 5 &&
          p.includes(decoded.get('b') ?? '') &&
          p.includes(decoded.get('f') ?? ''),
      )
      ?.split('')
      .sort()
      .join('') ?? '';

  const six =
    patterns
      .find(
        p =>
          p.length === 6 &&
          p.includes(decoded.get('e') ?? '') &&
          p.includes(decoded.get('d') ?? ''),
      )
      ?.split('')
      .sort()
      .join('') ?? '';

  const seven =
    patterns
      .find(p => p.length === 3)
      ?.split('')
      .sort()
      .join('') ?? '';

  const eight =
    patterns
      .find(p => p.length === 7)
      ?.split('')
      .sort()
      .join('') ?? '';

  const nine =
    patterns
      .find(
        p =>
          p.length === 6 &&
          p.includes(decoded.get('c') ?? '') &&
          p.includes(decoded.get('d') ?? ''),
      )
      ?.split('')
      .sort()
      .join('') ?? '';

  return [zero, one, two, three, four, five, six, seven, eight, nine];
};

const calculateOutput = (outputs: string[], codes: string[]): number => {
  const sorted = outputs.map(o => o.split('').sort().join(''));
  const numerical = sorted.map(o => codes.indexOf(o));
  return parseInt(numerical.join(''), 10);
};

const solveDisplay = (display: Display): number => {
  const decoded = decodeDisplay(display);
  const numbers = decodedToNumbers(decoded, display.patterns);
  const output = calculateOutput(display.output, numbers);
  return output;
};

export class Puzzle202108 extends PuzzleDay {
  part1() {
    const displays = parseInput(this.input);
    const count = countSimple(displays);
    return `${count}`;
  }

  part2() {
    const displays = parseInput(this.input);
    const outputs = displays.map(solveDisplay);
    const total = outputs.reduce((s, c) => s + c, 0);
    return `${total}`;
  }
}
