import { PuzzleDay } from '../puzzleDay';
import { Puzzle201801 } from './201801';
import { Puzzle201802 } from './201802';
import { Puzzle201803 } from './201803';
import { Puzzle201901 } from './201901';
import { Puzzle201902 } from './201902';
import { Puzzle201903 } from './201903';
import { Puzzle201904 } from './201904';
import { Puzzle201905 } from './201905';
import { Puzzle201906 } from './201906';
import { Puzzle201907 } from './201907';
import { Puzzle201908 } from './201908';
import { Puzzle201909 } from './201909';
import { Puzzle201910 } from './201910';
import { Puzzle201911 } from './201911';
import { Puzzle201912 } from './201912';
import { Puzzle201913 } from './201913';
import { Puzzle201914 } from './201914';
import { Puzzle201915 } from './201915';
import { Puzzle201916 } from './201916';
import { Puzzle201917 } from './201917';
import { Puzzle202001 } from './202001';
import { Puzzle202002 } from './202002';
import { Puzzle202003 } from './202003';
import { Puzzle202004 } from './202004';
import { Puzzle202005 } from './202005';
import { Puzzle202006 } from './202006';
import { Puzzle202007 } from './202007';
import { Puzzle202008 } from './202008';
import { Puzzle202009 } from './202009';
import { Puzzle202010 } from './202010';
import { Puzzle202011 } from './202011';
/** (Imports Here) */


export const dateToSolution: { [key: string]: (inputFile: string) => PuzzleDay } = {
  201801: (input) => new Puzzle201801(input),
  201802: (input) => new Puzzle201802(input),
  201803: (input) => new Puzzle201803(input),
  201901: (input) => new Puzzle201901(input),
  201902: (input) => new Puzzle201902(input),
  201903: (input) => new Puzzle201903(input),
  201904: (input) => new Puzzle201904(input),
  201905: (input) => new Puzzle201905(input),
  201906: (input) => new Puzzle201906(input),
  201907: (input) => new Puzzle201907(input),
  201908: (input) => new Puzzle201908(input),
  201909: (input) => new Puzzle201909(input),
  201910: (input) => new Puzzle201910(input),
  201911: (input) => new Puzzle201911(input),
  201912: (input) => new Puzzle201912(input),
  201913: (input) => new Puzzle201913(input),
  201914: (input) => new Puzzle201914(input),
  201915: (input) => new Puzzle201915(input),
  201916: (input) => new Puzzle201916(input),
  201917: (input) => new Puzzle201917(input),
  202001: (input) => new Puzzle202001(input),
  202002: (input) => new Puzzle202002(input),
  202003: (input) => new Puzzle202003(input),
  202004: (input) => new Puzzle202004(input),
  202005: (input) => new Puzzle202005(input),
  202006: (input) => new Puzzle202006(input),
  202007: (input) => new Puzzle202007(input),
  202008: (input) => new Puzzle202008(input),
  202009: (input) => new Puzzle202009(input),
  202010: (input) => new Puzzle202010(input),
  202011: (input) => new Puzzle202011(input),
  /** (Maps Here) */
};
