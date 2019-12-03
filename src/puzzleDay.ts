import { getData } from './readfile';

export abstract class PuzzleDay {
  inputFile: string;
  input: string;

  abstract part1(): string;

  abstract part2(): string;

  constructor(inputFile: string) {
    this.inputFile = inputFile;
    this.input = '';
  }

  async loadData(input?: string): Promise<void> {
    if (!input) {
      this.input = await getData(this.inputFile);
    } else {
      this.input = input;
    }
  }
}
