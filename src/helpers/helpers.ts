export const splitLines = (text: string): string[] =>
  text.split(/\r?\n/).map(line => line.trim());

export const permutator = <T>(arr: T[]): T[][] => {
  const permutations: T[][] = [];
  if (arr.length === 1) {
    return [arr];
  }

  for (let i = 0; i < arr.length; i++) {
    const subPerms = permutator(arr.slice(0, i).concat(arr.slice(i + 1)));
    for (let j = 0; j < subPerms.length; j++) {
      subPerms[j].unshift(arr[i]);
      permutations.push(subPerms[j]);
    }
  }
  return permutations;
};

export const modInverse = (a: bigint, m: bigint) => {
  const g = gcd(a, m);

  if (g != 1n) {
    throw new Error('No Inverse');
  } else {
    return power(a, m - 2n, m);
  }
};

export const power = (x: bigint, y: bigint, m: bigint): bigint => {
  if (y === 0n) return 1n;

  let p = power(x, y / 2n, m) % m;
  p = (p * p) % m;

  if (y % 2n === 0n) return p;
  else return ((x * p) % m);
};

export const gcd = (a: bigint, b: bigint): bigint => {
  if (a === 0n) return b;
  return gcd(b % a, a);
};