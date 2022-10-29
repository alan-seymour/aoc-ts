import prettyTime from 'pretty-time';
import * as yargs from 'yargs';
import { PuzzleDay } from './puzzleDay';
import { dateToSolution } from './solutions';

const NS_PER_SEC = 1e9;

const argv = yargs
  .options({
    day: { type: 'string', default: '' },
    d: { type: 'string', default: '' },
    input: { type: 'string', default: '' },
    part: { type: 'number', default: 0 },
    p: { type: 'number', default: 1 },
    time: { type: 'boolean', default: false },
    t: { type: 'boolean', default: false },
  })
  .parseSync();

const run = async () => {
  const dayArg: string = argv.day || argv.d || '';
  const inputFile = argv.input || `./inputs/${dayArg}.txt`;
  const part = argv.part || argv.p;
  const outputTime = argv.time || argv.t;

  let day: PuzzleDay | undefined;

  try {
    day = dayToInstantiatedClass(dayArg, inputFile);

    if (!day) {
      throw new Error('No such day');
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Invalid day or input file');
    return;
  }

  await day.loadData();
  const time = process.hrtime();

  let result = '';

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

  // eslint-disable-next-line no-console
  console.log(result);
};

const dayToInstantiatedClass = (day: string, inputFile: string): PuzzleDay | undefined =>
  dateToSolution[day]?.(inputFile) ?? undefined;

run();
