import * as day from "./201802";

describe("201802", () => {
  test("parseInput", () => {
    const input = `abc
    def
    asds`;
    const result = day.parseInput(input);
    expect(result).toEqual(["abc", "def", "asds"]);
  });

  test("part 1 example 1", () => {
    const result = day.part1(`abcdef`);
    expect(result).toBe("0");
  });

  test("part 1 example 2", () => {
    const result = day.part1(`bababc`);
    expect(result).toBe("1");
  });

  test("part 1 example 3", () => {
    const result = day.part1(`abcdef
    bababc
    abbcde
    abcccd
    aabcdd
    abcdee
    ababab`);
    expect(result).toBe("12");
  });

  test("part 2 example 1", () => {
    const result = day.part2(`abcde
    fghij
    klmno
    pqrst
    fguij
    axcye
    wvxyz`);
    expect(result).toBe("fgij");
  });
});
