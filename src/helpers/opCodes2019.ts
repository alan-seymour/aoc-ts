type IntCodeConstructor = {
  state?: number[];
  index?: number;
  halted?: boolean;
  input?: number[];
  output?: number[];
  relativeBase?: number;
  waitingForInput?: boolean;
};

type ParameterMode = 'Position' | 'Immediate' | 'Relative' | undefined;

const intToMode: { [k: number]: ParameterMode } = {
  0: 'Position',
  1: 'Immediate',
  2: 'Relative',
};

const fieldToOpcode = (
  value: number,
): { opcode: number; modes: ParameterMode[] } => {
  const split = value.toString().split('');
  if (split.length <= 1) {
    return {
      opcode: value,
      modes: [],
    };
  }

  const opcode = parseInt(split.splice(-2).join(''), 10);
  const modes = split.reverse().map(v => intToMode[parseInt(v, 10)]);
  return {
    opcode,
    modes,
  };
};

export class IntCodeComputer {
  state: number[];
  index: number;
  halted: boolean;
  input: number[];
  output: number[];
  relativeBase: number;
  waitingForInput: boolean;

  constructor({
    state = [],
    index = 0,
    halted = false,
    input = [],
    output = [],
    relativeBase = 0,
    waitingForInput = false,
  }: IntCodeConstructor) {
    this.state = [...state];
    this.index = index;
    this.halted = halted;
    this.input = [...input];
    this.output = [...output];
    this.relativeBase = relativeBase;
    this.waitingForInput = waitingForInput;
  }

  getValue(position: number, mode: ParameterMode): number {
    let value: number;
    switch (mode) {
      case 'Immediate':
        value = this.state[position];
        break;
      case 'Relative':
        value = this.state[this.state[position] + this.relativeBase];
        break;
      case 'Position':
      default:
        value = this.state[this.state[position]];
        break;
    }
    return value ? value : 0;
  }

  writeValue(position: number, mode: ParameterMode, value: number): number {
    let location: number;
    if (mode === 'Relative') {
      location = this.state[position] + this.relativeBase;
    } else {
      location = this.state[position];
    }
    this.state[location] = value;
    return location;
  }

  add(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    const param2 = this.getValue(this.index + 2, modes.shift());
    const answer = param1 + param2;
    const location = this.writeValue(this.index + 3, modes.shift(), answer);
    this.index = this.index === location ? this.index : this.index + 4;
  }

  multiply(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    const param2 = this.getValue(this.index + 2, modes.shift());
    const answer = param1 * param2;
    const location = this.writeValue(this.index + 3, modes.shift(), answer);
    this.index = this.index === location ? this.index : this.index + 4;
  }

  readInput(modes: ParameterMode[]): void {
    const input = this.input.shift();
    if (input === undefined) {
      this.waitingForInput = true;
      return;
    }
    const location = this.writeValue(this.index + 1, modes.shift(), input);
    this.index = this.index === location ? this.index : this.index + 2;
    this.waitingForInput = false;
  }

  writeOutput(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    this.index = this.index + 2;
    this.output.push(param1);
  }

  jumpIfTrue(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    const param2 = this.getValue(this.index + 2, modes.shift());

    this.index = param1 !== 0 ? param2 : this.index + 3;
  }

  jumpIfFalse(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    const param2 = this.getValue(this.index + 2, modes.shift());

    this.index = param1 === 0 ? param2 : this.index + 3;
  }

  lessThan(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    const param2 = this.getValue(this.index + 2, modes.shift());
    const value = param1 < param2 ? 1 : 0;
    const location = this.writeValue(this.index + 3, modes.shift(), value);
    this.index = this.index === location ? this.index : this.index + 4;
  }

  equalTo(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    const param2 = this.getValue(this.index + 2, modes.shift());
    const value = param1 === param2 ? 1 : 0;
    const location = this.writeValue(this.index + 3, modes.shift(), value);
    this.index = this.index === location ? this.index : this.index + 4;
  }

  adjustRelativeBase(modes: ParameterMode[]): void {
    const param1 = this.getValue(this.index + 1, modes.shift());
    this.index = this.index + 2;
    this.relativeBase = this.relativeBase + param1;
  }

  halt(modes: ParameterMode[]): void {
    this.halted = true;
  }

  step(): void {
    const { opcode, modes } = fieldToOpcode(this.state[this.index]);
    switch (opcode) {
      case 1:
        this.add(modes);
        break;
      case 2:
        this.multiply(modes);
        break;
      case 3:
        this.readInput(modes);
        break;
      case 4:
        this.writeOutput(modes);
        break;
      case 5:
        this.jumpIfTrue(modes);
        break;
      case 6:
        this.jumpIfFalse(modes);
        break;
      case 7:
        this.lessThan(modes);
        break;
      case 8:
        this.equalTo(modes);
        break;
      case 9:
        this.adjustRelativeBase(modes);
        break;
      case 99:
        this.halt(modes);
        break;
    }
  }

  runUntilWaitingForInput(): void {
    this.waitingForInput = false;
    while (!this.halted && !this.waitingForInput) {
      this.step();
    }
  }

  clone(): IntCodeComputer {
    return new IntCodeComputer({
      state: [...this.state],
      index: this.index,
      halted: this.halted,
      input: [...this.input],
      output: [...this.output],
      relativeBase: this.relativeBase,
      waitingForInput: this.waitingForInput,
    });
  }
}
