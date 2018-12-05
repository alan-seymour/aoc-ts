import { getData } from './readfile';

export const getPart = () =>  process.argv[2];

export const run = async (inputFile: string, solutions: { (data: string): string; }[]) => {
  const part = parseInt(getPart(), 10) - 1;
  if (part !== 1 && part !== 0) {
    console.error('Invalid Part');
    return;
  }
  const input = await getData(inputFile);
  console.log(solutions[part](input));
};

export const splitLines = (text: string) => text.split(/\r?\n/).map(line => line.trim());