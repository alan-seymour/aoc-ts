import { PuzzleDay } from '../puzzleDay';

export const parseInput = (input: string): number[] => {
  const labels = input.split('').map((v) => parseInt(v, 10));
  return labels;
};

class Cup {
  constructor(public id: number, public next?: Cup) {}
}

const loopLinkedMoves = (cups: Cup[], loopCount: number): Map<number, Cup> => {
  let current: Cup | undefined = cups[0];
  const map = new Map(cups.map((c) => [c.id, c]));
  for (let i = 0; i < loopCount; i++) {
    current = doLinkedMove(map, current);
    if (!current) {
      throw new Error(`loop linked moves # ${i}`);
    }
  }
  return map;
};

const doLinkedMove = (map: Map<number, Cup>, current: Cup): Cup | undefined => {
  const remove = current.next;
  current.next = remove?.next?.next?.next;

  const removed = [remove?.id, remove?.next?.id, remove?.next?.next?.id];

  let destination = current.id;

  do {
    destination = destination === 1 ? map.size : destination - 1;
  } while (removed.indexOf(destination) !== -1);

  const destinationCup = map.get(destination);

  if (destinationCup) {
    const next = destinationCup?.next;
    destinationCup.next = remove;
    const newNextLocation = remove?.next?.next;
    if (newNextLocation) {
      newNextLocation.next = next;
    }
  }

  return current.next;
};

const labelsToLL = (labels: number[]): Cup[] => {
  const cups = labels.map((l) => new Cup(l));
  cups.forEach((c, i) => {
    c.next = cups[i + 1];
  });
  cups[cups.length - 1].next = cups[0];
  return cups;
};

export class Puzzle202023 extends PuzzleDay {
  part1() {
    const labels = parseInput(this.input);
    const cups = labelsToLL(labels);
    const finalArangement = loopLinkedMoves(cups, 100);
    const one = finalArangement.get(1);
    let temp = one?.next;
    let output = '';
    while (temp && temp.id !== 1) {
      output = `${output}${temp.id}`;
      temp = temp.next;
    }
    return output;
  }

  part2() {
    const labels = parseInput(this.input);
    for (let i = 9; i < 1000000; i++) {
      labels[i] = i + 1;
    }
    const cups = labelsToLL(labels);
    const finalArangement = loopLinkedMoves(cups, 10000000);
    const one = finalArangement.get(1);
    const result = (one?.next?.id ?? 1) * (one?.next?.next?.id ?? 1);
    return `${result}`;
  }
}
