import { PuzzleDay } from '../puzzleDay';

type Passport = {
  [key: string]: string;
};

export const parseInput = (input: string): Passport[] => {
  const passports = input.split(/\r?\n\r?\n/).map(p => p.replace(/\n/g, ' ').split(' ')).map(g =>
    g.reduce<Passport>((obj, pair) => {
      const [key, val] = pair.split(':');
      obj[key] = val;
      return obj;
    }, {}));
  return passports;
};

const requiredKeys = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const part1valid = (passport: Passport): boolean => requiredKeys.every(key => passport[key] !== undefined);

const keyValidation: { [key: string]: (val: string) => boolean } = {
  'byr': (val) => {
    const valInt = parseInt(val, 10);
    return valInt >= 1920 && valInt <= 2002;
  },
  'iyr': (val) => {
    const valInt = parseInt(val, 10);
    return valInt >= 2010 && valInt <= 2020;
  },
  'eyr': (val) => {
    const valInt = parseInt(val, 10);
    return valInt >= 2020 && valInt <= 2030;
  },
  'hgt': (val) => {
    const units = val.slice(-2);
    const value = parseInt(val.slice(0, -2), 10);
    if (units === 'cm') {
      return value >= 150 && value <= 193;
    }
    if (units === 'in') {
      return value >= 59 && value <= 76;
    }
    return false;
  },
  'hcl': (val) => {
    return /^#[0-9a-fA-F]{6}$/.test(val);
  },
  'ecl': (val) => {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(c => c === val);
  },
  'pid': (val) => {
    return /^\d{9}$/.test(val);
  },
};

const part2valid = (passport: Passport): boolean => requiredKeys.every(key => passport[key] !== undefined && keyValidation[key](passport[key]));

export class Puzzle202004 extends PuzzleDay {
  part1() {
    const passports = parseInput(this.input);
    const valid = passports.filter(part1valid);
    return `${valid.length}`;
  }

  part2() {
    const passports = parseInput(this.input);
    const valid = passports.filter(part2valid);
    return `${valid.length}`;
  }
}
