import { splitLines } from '../helpers';
import { PuzzleDay } from '../puzzleDay';

type SetGate = {
  action: 'SET';
  input: string | number;
};

type NotGate = {
  action: 'NOT';
  input: string | number;
};

type AndGate = {
  action: 'AND';
  input: [string | number, string | number];
};

type OrGate = {
  action: 'OR';
  input: [string | number, string | number];
};

type LshiftGate = {
  action: 'LSHIFT';
  input: string | number;
  places: number;
};

type RshiftGate = {
  action: 'RSHIFT';
  input: string | number;
  places: number;
};

type Gate = SetGate | NotGate | AndGate | OrGate | LshiftGate | RshiftGate;

type Wire = {
  input: Gate;
  output?: number;
};

export const parseInput = (input: string): Map<string, Wire> => {
  const wires = new Map<string, Wire>();

  splitLines(input).forEach(line => {
    const setMatch = line.match(/(.*) -> (.*)/);
    const notMatch = line.match(/NOT (.*) -> (.*)/);
    const andMatch = line.match(/(.*) AND (.*) -> (.*)/);
    const orMatch = line.match(/(.*) OR (.*) -> (.*)/);
    const lShiftMatch = line.match(/(.*) LSHIFT (.*) -> (.*)/);
    const rShiftMatch = line.match(/(.*) RSHIFT (.*) -> (.*)/);

    if (rShiftMatch !== null) {
      wires.set(rShiftMatch[3], {
        input: {
          action: 'RSHIFT',
          input: isNaN(parseInt(rShiftMatch[1], 10)) ? rShiftMatch[1] : parseInt(rShiftMatch[1]),
          places: parseInt(rShiftMatch[2], 10),
        },
      });
    } else if (lShiftMatch !== null) {
      wires.set(lShiftMatch[3], {
        input: {
          action: 'LSHIFT',
          input: isNaN(parseInt(lShiftMatch[1], 10)) ? lShiftMatch[1] : parseInt(lShiftMatch[1]),
          places: parseInt(lShiftMatch[2], 10),
        },
      });
    } else if (orMatch !== null) {
      wires.set(orMatch[3], {
        input: {
          action: 'OR',
          input: [
            isNaN(parseInt(orMatch[1], 10)) ? orMatch[1] : parseInt(orMatch[1]),
            isNaN(parseInt(orMatch[2], 10)) ? orMatch[2] : parseInt(orMatch[2]),
          ],
        },
      });
    } else if (andMatch !== null) {
      wires.set(andMatch[3], {
        input: {
          action: 'AND',
          input: [
            isNaN(parseInt(andMatch[1], 10)) ? andMatch[1] : parseInt(andMatch[1]),
            isNaN(parseInt(andMatch[2], 10)) ? andMatch[2] : parseInt(andMatch[2]),
          ],
        },
      });
    } else if (notMatch !== null) {
      wires.set(notMatch[2], {
        input: {
          action: 'NOT',
          input: isNaN(parseInt(notMatch[1], 10)) ? notMatch[1] : parseInt(notMatch[1]),
        },
      });
    } else if (setMatch !== null) {
      wires.set(setMatch[2], {
        input: {
          action: 'SET',
          input: isNaN(parseInt(setMatch[1], 10)) ? setMatch[1] : parseInt(setMatch[1]),
        },
      });
    }
  });

  return wires;
};

const resolveWires = (wires: Map<string, Wire>): Map<string, Wire> => {
  const queue: string[] = [...wires.keys()];

  while (queue.length !== 0) {
    const wireName = queue.shift();

    if (!wireName) {
      throw new Error(`Queue empty`);
    }

    const wire = wires.get(wireName);

    if (!wire) {
      throw new Error(`Can't find wire?`);
    }

    const processed = processWire(wire, wires);

    if (processed === null) {
      queue.push(wireName);
    } else {
      wires.set(wireName, processed);
    }
  }

  return wires;
};

const bitwiseNot = (input: number): number =>
  parseInt(
    input
      .toString(2)
      .padStart(16, '0')
      .split('')
      .map(b => (b === '0' ? '1' : '0'))
      .join(''),
    2,
  );

const shiftLeft = (input: number, places: number): number => {
  const inputArray = input.toString(2).padStart(16, '0').split('');

  for (let i = 0; i < places; i++) {
    inputArray.shift();
    inputArray.push('0');
  }

  return parseInt(inputArray.join(''), 2);
};

const shiftRight = (input: number, places: number): number => {
  const inputArray = input.toString(2).padStart(16, '0').split('');

  for (let i = 0; i < places; i++) {
    inputArray.pop();
    inputArray.unshift('0');
  }

  return parseInt(inputArray.join(''), 2);
};

const processWire = (wire: Wire, wires: Map<string, Wire>): Wire | null => {
  switch (wire.input.action) {
    case 'SET': {
      let input = wire.input.input;

      if (typeof input === 'string') {
        const inputWire = wires.get(input);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input = inputWire.output;
      }

      return {
        input: {
          ...wire.input,
          input,
        },
        output: input,
      };
    }

    case 'NOT': {
      let input = wire.input.input;

      if (typeof input === 'string') {
        const inputWire = wires.get(input);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input = inputWire.output;
      }

      return {
        input: {
          ...wire.input,
          input,
        },
        output: bitwiseNot(input),
      };
    }

    case 'AND': {
      let [input1, input2] = wire.input.input;

      if (typeof input1 === 'string') {
        const inputWire = wires.get(input1);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input1 = inputWire.output;
      }

      if (typeof input2 === 'string') {
        const inputWire = wires.get(input2);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input2 = inputWire.output;
      }

      return {
        input: {
          ...wire.input,
          input: [input1, input2],
        },
        output: input1 & input2,
      };
    }

    case 'OR': {
      let [input1, input2] = wire.input.input;

      if (typeof input1 === 'string') {
        const inputWire = wires.get(input1);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input1 = inputWire.output;
      }

      if (typeof input2 === 'string') {
        const inputWire = wires.get(input2);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input2 = inputWire.output;
      }

      return {
        input: {
          ...wire.input,
          input: [input1, input2],
        },
        output: input1 | input2,
      };
    }

    case 'LSHIFT': {
      let input = wire.input.input;

      if (typeof input === 'string') {
        const inputWire = wires.get(input);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input = inputWire.output;
      }

      return {
        input: {
          ...wire.input,
          input,
        },
        output: shiftLeft(input, wire.input.places),
      };
    }

    case 'RSHIFT': {
      let input = wire.input.input;

      if (typeof input === 'string') {
        const inputWire = wires.get(input);

        if (!inputWire || inputWire.output === undefined) {
          return null;
        }

        input = inputWire.output;
      }

      return {
        input: {
          ...wire.input,
          input,
        },
        output: shiftRight(input, wire.input.places),
      };
    }
  }
};

export class Puzzle201507 extends PuzzleDay {
  part1() {
    const wires = parseInput(this.input);
    const resolved = resolveWires(wires);
    return `${resolved.get('a')?.output}`;
  }

  part2() {
    const initialWires = parseInput(this.input);
    const resolved = resolveWires(new Map(initialWires));
    const a = resolved.get('a')?.output ?? 0;

    initialWires.set('b', {
      input: {
        action: 'SET',
        input: a,
      },
      output: a,
    });

    const finalResolved = resolveWires(new Map(initialWires));

    return `${finalResolved.get('a')?.output}`;
  }
}
