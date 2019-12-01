import { Puzzle201901, parseInput } from "./201901";

let day: Puzzle201901;

describe("201901", () => {
  beforeEach(() => {
    day = new Puzzle201901("");
  });

  test("parseInput", () => {
    const input = `7
    7
    2
    7
    4`;
    const result = parseInput(input);
    expect(result).toEqual([7, 7, 2, 7, 4]);
  });

  test("part1 example1", () => {
    day.loadData(`12`);
    const result = day.part1();
    expect(result).toBe("2");
  });

  test("part1 example2", () => {
    day.loadData(`14`);
    const result = day.part1();
    expect(result).toBe("2");
  });

  test("part1 example3", () => {
    day.loadData(`1969`);
    const result = day.part1();
    expect(result).toBe("654");
  });

  test("part1 example4", () => {
    day.loadData(`100756`);
    const result = day.part1();
    expect(result).toBe("33583");
  });

  test("part1 total", () => {
    day.loadData(`12
    14
    1969
    100756`);
    const result = day.part1();
    expect(result).toBe("34241");
  });

  test("part2 example1", () => {
    day.loadData(`1969`);
    const result = day.part2();
    expect(result).toBe("966");
  });

  test("part2 example2", () => {
    day.loadData(`100756`);
    const result = day.part2();
    expect(result).toBe("50346");
  });
});
