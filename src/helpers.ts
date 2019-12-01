export const splitLines = (text: string) =>
  text.split(/\r?\n/).map(line => line.trim());
