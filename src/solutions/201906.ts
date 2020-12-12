import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type OrbitMap = Map<string, string[]>;

const inputToMap = (input: string): OrbitMap => {
  const map = new Map<string, string[]>();
  const orbits = splitLines(input).forEach(line => {
    const [inner, outer] = line.split(')');
    let outers = map.get(inner);
    if (!outers) {
      outers = [];
    }
    outers.push(outer);
    map.set(inner, outers);
  });
  return map;
};

const youSantaUp = (input: string): { you: string[]; santa: string[] } => {
  const outerToInnerMap = new Map<string, string>();
  const orbits = splitLines(input).forEach(line => {
    const [inner, outer] = line.split(')');
    outerToInnerMap.set(outer, inner);
  });
  let current = 'YOU';
  const youPath: string[] = ['YOU'];
  const sanPath: string[] = ['SAN'];
  while (current != 'COM') {
    current = <string>outerToInnerMap.get(current);
    youPath.push(current);
  }
  current = 'SAN';
  while (current != 'COM') {
    current = <string>outerToInnerMap.get(current);
    sanPath.push(current);
  }
  return {
    you: youPath,
    santa: sanPath,
  };
};

const sumDepth = (map: OrbitMap, node = 'COM', depth = 0): number => {
  const children = map.get(node);
  if (!children) {
    return depth;
  }
  const depths = children.map(child => sumDepth(map, child, depth + 1));
  return depths.reduce((p, c) => p + c) + depth;
};

const findCommonNode = (arr1: string[], arr2: string[]) => {
  const common = arr1.find(node => arr2.indexOf(node) !== -1);
  if (!common) {
    throw new Error('No Path!');
  }
  return common;
};

export class Puzzle201906 extends PuzzleDay {
  part1() {
    const map = inputToMap(this.input);
    const depth = sumDepth(map);
    return `${depth}`;
  }

  part2() {
    const paths = youSantaUp(this.input);
    const commonNode = findCommonNode(paths.you, paths.santa);
    const distance =
      paths.you.indexOf(commonNode) + paths.santa.indexOf(commonNode) - 2;
    return `${distance}`;
  }
}
