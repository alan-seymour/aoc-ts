import * as yargs from 'yargs';
import { Puzzle201801 } from './201801';
import { Puzzle201802 } from './201802';
import { Puzzle201803 } from './201803';
import { Puzzle201901 } from './201901';
import { Puzzle201902 } from './201902';
import { Puzzle201903 } from './201903';
import { Puzzle201904 } from './201904';
import { PuzzleDay } from './puzzleDay';

const prettyTime = require('pretty-time');

const NS_PER_SEC = 1e9;

const argv = yargs.options({
  day: { type: 'string', default: '' },
  d: { type: 'string', default: '' },
  input: { type: 'string', default: '' },
  part: { type: 'number', default: 0 },
  p: { type: 'number', default: 1 },
  time: { type: 'boolean', default: false },
  t: { type: 'boolean', default: false },
}).argv;

async function run() {
  const dayArg: string = argv.day || argv.d || '';
  const inputFile = argv.input || `./inputs/${dayArg}.txt`;
  const part = argv.part || argv.p;
  const outputTime = argv.time || argv.t;

  let day: PuzzleDay;
  try {
    day = dayToInstantiatedClass(dayArg, inputFile);
  } catch (e) {
    console.log('Invalid day or input file');
    return;
  }

  await day.loadData();
  const time = process.hrtime();

  let result: string = '';

  if (part === 1) {
    result = day.part1();
  }
  if (part === 2) {
    result = day.part2();
  }

  if (outputTime) {
    const diff = process.hrtime(time);
    result = `${result} in ${prettyTime(diff)}`;
  }

  console.log(result);
}

const dayToInstantiatedClass = (day: string, inputFile: string): PuzzleDay => {
  switch (day) {
    case '201801':
      return new Puzzle201801(inputFile);
    case '201802':
      return new Puzzle201802(inputFile);
    case '201803':
      return new Puzzle201803(inputFile);
    case '201901':
      return new Puzzle201901(inputFile);
    case '201902':
      return new Puzzle201902(inputFile);
    case '201903':
      return new Puzzle201903(inputFile);
    case '201904':
      return new Puzzle201904(inputFile);
    default:
      throw new Error('No Such Day');
  }
};

run();
