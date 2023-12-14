import { PuzzleDay } from '../puzzleDay';
import { Puzzle201501 } from './201501';
import { Puzzle201502 } from './201502';
import { Puzzle201503 } from './201503';
import { Puzzle201504 } from './201504';
import { Puzzle201505 } from './201505';
import { Puzzle201506 } from './201506';
import { Puzzle201507 } from './201507';
import { Puzzle201508 } from './201508';
import { Puzzle201509 } from './201509';
import { Puzzle201510 } from './201510';
import { Puzzle201511 } from './201511';
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
import { Puzzle202012 } from './202012';
import { Puzzle202013 } from './202013';
import { Puzzle202014 } from './202014';
import { Puzzle202015 } from './202015';
import { Puzzle202016 } from './202016';
import { Puzzle202017 } from './202017';
import { Puzzle202018 } from './202018';
import { Puzzle202019 } from './202019';
import { Puzzle202020 } from './202020';
import { Puzzle202021 } from './202021';
import { Puzzle202022 } from './202022';
import { Puzzle202023 } from './202023';
import { Puzzle202024 } from './202024';
import { Puzzle202025 } from './202025';
import { Puzzle202101 } from './202101';
import { Puzzle202102 } from './202102';
import { Puzzle202103 } from './202103';
import { Puzzle202104 } from './202104';
import { Puzzle202105 } from './202105';
import { Puzzle202106 } from './202106';
import { Puzzle202107 } from './202107';
import { Puzzle202108 } from './202108';
import { Puzzle202109 } from './202109';
import { Puzzle202110 } from './202110';
import { Puzzle202111 } from './202111';
import { Puzzle202112 } from './202112';
import { Puzzle202113 } from './202113';
import { Puzzle202114 } from './202114';
import { Puzzle202115 } from './202115';
import { Puzzle202201 } from './202201';
import { Puzzle202202 } from './202202';
import { Puzzle202203 } from './202203';
import { Puzzle202204 } from './202204';
import { Puzzle202205 } from './202205';
import { Puzzle202206 } from './202206';
import { Puzzle202301 } from './202301';
import { Puzzle202302 } from './202302';
import { Puzzle202303 } from './202303';
import { Puzzle202304 } from './202304';
import { Puzzle202305 } from './202305';
import { Puzzle202306 } from './202306';
import { Puzzle202307 } from './202307';
import { Puzzle202308 } from './202308';
import { Puzzle202309 } from './202309';
import { Puzzle202310 } from './202310';
import { Puzzle202311 } from './202311';
import { Puzzle202312 } from './202312';
import { Puzzle202313 } from './202313';
import { Puzzle202314 } from './202314';
/** (Imports Here) */

export const dateToSolution: {
  [key: string]: (inputFile: string) => PuzzleDay;
} = {
  201501: input => new Puzzle201501(input),
  201502: input => new Puzzle201502(input),
  201503: input => new Puzzle201503(input),
  201504: input => new Puzzle201504(input),
  201505: input => new Puzzle201505(input),
  201506: input => new Puzzle201506(input),
  201507: input => new Puzzle201507(input),
  201508: input => new Puzzle201508(input),
  201509: input => new Puzzle201509(input),
  201510: input => new Puzzle201510(input),
  201511: input => new Puzzle201511(input),
  201801: input => new Puzzle201801(input),
  201802: input => new Puzzle201802(input),
  201803: input => new Puzzle201803(input),
  201901: input => new Puzzle201901(input),
  201902: input => new Puzzle201902(input),
  201903: input => new Puzzle201903(input),
  201904: input => new Puzzle201904(input),
  201905: input => new Puzzle201905(input),
  201906: input => new Puzzle201906(input),
  201907: input => new Puzzle201907(input),
  201908: input => new Puzzle201908(input),
  201909: input => new Puzzle201909(input),
  201910: input => new Puzzle201910(input),
  201911: input => new Puzzle201911(input),
  201912: input => new Puzzle201912(input),
  201913: input => new Puzzle201913(input),
  201914: input => new Puzzle201914(input),
  201915: input => new Puzzle201915(input),
  201916: input => new Puzzle201916(input),
  201917: input => new Puzzle201917(input),
  202001: input => new Puzzle202001(input),
  202002: input => new Puzzle202002(input),
  202003: input => new Puzzle202003(input),
  202004: input => new Puzzle202004(input),
  202005: input => new Puzzle202005(input),
  202006: input => new Puzzle202006(input),
  202007: input => new Puzzle202007(input),
  202008: input => new Puzzle202008(input),
  202009: input => new Puzzle202009(input),
  202010: input => new Puzzle202010(input),
  202011: input => new Puzzle202011(input),
  202012: input => new Puzzle202012(input),
  202013: input => new Puzzle202013(input),
  202014: input => new Puzzle202014(input),
  202015: input => new Puzzle202015(input),
  202016: input => new Puzzle202016(input),
  202017: input => new Puzzle202017(input),
  202018: input => new Puzzle202018(input),
  202019: input => new Puzzle202019(input),
  202020: input => new Puzzle202020(input),
  202021: input => new Puzzle202021(input),
  202022: input => new Puzzle202022(input),
  202023: input => new Puzzle202023(input),
  202024: input => new Puzzle202024(input),
  202025: input => new Puzzle202025(input),
  202101: input => new Puzzle202101(input),
  202102: input => new Puzzle202102(input),
  202103: input => new Puzzle202103(input),
  202104: input => new Puzzle202104(input),
  202105: input => new Puzzle202105(input),
  202106: input => new Puzzle202106(input),
  202107: input => new Puzzle202107(input),
  202108: input => new Puzzle202108(input),
  202109: input => new Puzzle202109(input),
  202110: input => new Puzzle202110(input),
  202111: input => new Puzzle202111(input),
  202112: input => new Puzzle202112(input),
  202113: input => new Puzzle202113(input),
  202114: input => new Puzzle202114(input),
  202115: input => new Puzzle202115(input),
  202201: input => new Puzzle202201(input),
  202202: input => new Puzzle202202(input),
  202203: input => new Puzzle202203(input),
  202204: input => new Puzzle202204(input),
  202205: input => new Puzzle202205(input),
  202301: input => new Puzzle202301(input),
  202206: input => new Puzzle202206(input),
  202302: input => new Puzzle202302(input),
  202303: input => new Puzzle202303(input),
  202304: input => new Puzzle202304(input),
  202305: input => new Puzzle202305(input),
  202306: input => new Puzzle202306(input),
  202307: input => new Puzzle202307(input),
  202308: input => new Puzzle202308(input),
  202309: input => new Puzzle202309(input),
  202310: input => new Puzzle202310(input),
  202311: input => new Puzzle202311(input),
  202312: input => new Puzzle202312(input),
  202313: input => new Puzzle202313(input),
  202314: input => new Puzzle202314(input),
  /** (Maps Here) */
};
