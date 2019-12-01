import * as day from "./201901";

describe("201901", () => {
  test("parseInput", () => {
    const input = `7
    7
    2
    7
    4`;
    const result = day.parseInput(input);
    expect(result).toEqual([7, 7, 2, 7, 4]);
  });

  test("part1 example1", () => {
    const result = day.part1(`12`);
    expect(result).toBe("2");
  });

  test("part1 example2", () => {
    const result = day.part1(`14`);
    expect(result).toBe("2");
  });

  test("part1 example3", () => {
    const result = day.part1(`1969`);
    expect(result).toBe("654");
  });

  test("part1 example4", () => {
    const result = day.part1(`100756`);
    expect(result).toBe("33583");
  });

  test("part1 total", () => {
    const result = day.part1(`12
    14
    1969
    100756`);
    expect(result).toBe("34241");
  });

  test("part2 example1", () => {
    const result = day.part2(`1969`);
    expect(result).toBe("966");
  });

  test("part2 example2", () => {
    const result = day.part2(`100756`);
    expect(result).toBe("50346");
  });
});
